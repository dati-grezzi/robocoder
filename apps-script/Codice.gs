/**
 * Robot Coder — ponte verso Google Drive per i ricordi dell'Open Day
 * Istituto "Enrico Mestica" · Civitanova Marche
 * Repository: https://github.com/dati-grezzi/robocoder
 *
 * L'app vive su GitHub Pages; questo script (account della scuola dedicato)
 * riceve i PDF e li salva nella cartella Drive "Ricordi Open Day", dove tiene
 * anche il registro anti-doppioni. Accetta solo richieste con il CODICE.
 *
 * INSTALLAZIONE: vedi docs/ISTRUZIONI.md § 4 A.
 *  1. script.google.com con l'account dedicato → Nuovo progetto "Robot Coder Drive"
 *     → incolla questo file in Codice.gs.
 *  2. Esegui setup (autorizza Drive): il log mostra il link della cartella e il CODICE.
 *  3. Esegui il deployment → App web → Esegui come: Me · Chi ha accesso: Chiunque.
 *     L'URL /exec va inserito in index.html (DRIVE_URL_DEFAULT) o nell'area docente.
 *  Per cambiare il CODICE: esegui nuovoCodice e aggiornalo sui PC.
 */

const FOLDER_NAME = 'Ricordi Open Day';
const REG_NAME = '_registro.json';
const MAX_BYTES = 8 * 1024 * 1024;           // un ricordo pesa ~0,4 MB; un PDF unito di 50 pagine ~20 MB (vedi MAX_MERGED)
const MAX_MERGED = 45 * 1024 * 1024;

/* ---------- installazione ---------- */
function setup() {
  const p = PropertiesService.getScriptProperties();
  const folder = getFolder_(true);
  if (!p.getProperty('TOKEN')) p.setProperty('TOKEN', newToken_());
  Logger.log('Cartella dei ricordi: ' + folder.getUrl());
  Logger.log('CODICE da inserire in RobotCoder: ' + p.getProperty('TOKEN'));
}
function nuovoCodice() {
  const t = newToken_();
  PropertiesService.getScriptProperties().setProperty('TOKEN', t);
  Logger.log('Nuovo CODICE: ' + t + '  (aggiornalo su tutti i PC)');
}
function newToken_() { return Utilities.getUuid().replace(/-/g, '').slice(0, 12).toUpperCase(); }

function getFolder_(create) {
  const p = PropertiesService.getScriptProperties();
  const id = p.getProperty('FOLDER_ID');
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) {} }
  if (!create) throw new Error('cartella non configurata: esegui setup()');
  const it = DriveApp.getRootFolder().getFoldersByName(FOLDER_NAME);
  const f = it.hasNext() ? it.next() : DriveApp.getRootFolder().createFolder(FOLDER_NAME);
  p.setProperty('FOLDER_ID', f.getId());
  return f;
}

/* ---------- web app ---------- */
function doGet() {
  return out_({ ok: true, app: 'RobotCoder', msg: 'Ponte attivo. L\'app è su https://datigrezzi.it/robocoder/' });
}

/** chiamata dall'app (GitHub Pages): serve il CODICE */
function doPost(e) {
  try {
    const req = JSON.parse(e.postData.contents);
    const token = PropertiesService.getScriptProperties().getProperty('TOKEN');
    if (!token || req.token !== token) return out_({ ok: false, err: 'codice errato' });
    return out_(handle_(req));
  } catch (err) {
    return out_({ ok: false, err: String(err && err.message || err) });
  }
}

function handle_(req) {
    const p = PropertiesService.getScriptProperties();
    const folder = getFolder_(false);

    switch (req.action) {
      case 'ping':
        return ({ ok: true, folderUrl: folder.getUrl(), folderName: folder.getName() });

      case 'upload':
        return (upload_(folder, req.name, req.b64, !!req.merged));

      case 'registry':
        return ({ ok: true, entries: readReg_(folder), epoch: p.getProperty('EPOCH') || '' });

      case 'register':
        return (withLock_(function () {
          const reg = readReg_(folder), seen = {};
          reg.forEach(function (x) { seen[x.pc + '|' + x.t] = true; });
          (req.entries || []).slice(0, 200).forEach(function (x) {
            const c = cleanEntry_(x);
            if (c && !seen[c.pc + '|' + c.t]) { reg.push(c); seen[c.pc + '|' + c.t] = true; }
          });
          writeReg_(folder, reg);
          return { ok: true, count: reg.length };
        }));

      case 'resetRegistry':
        return (withLock_(function () {
          writeReg_(folder, []);
          const ep = Date.now().toString(36);
          p.setProperty('EPOCH', ep);
          return { ok: true, epoch: ep };
        }));

      case 'list': {
        const files = [], it = folder.getFiles();
        while (it.hasNext()) {
          const f = it.next();
          if (f.getMimeType() === MimeType.PDF) files.push({ id: f.getId(), name: f.getName(), size: f.getSize() });
        }
        files.sort(function (a, b) { return a.name < b.name ? -1 : 1; });
        return { ok: true, files: files };
      }

      case 'get': {
        const f = DriveApp.getFileById(String(req.id));
        if (!inFolder_(f, folder)) return { ok: false, err: 'file non nella cartella' };
        return ({ ok: true, name: f.getName(), b64: Utilities.base64Encode(f.getBlob().getBytes()) });
      }
    }
    return { ok: false, err: 'azione sconosciuta' };
}

/* ---------- funzioni interne ---------- */
function upload_(folder, name, b64, merged) {
  name = String(name || '').replace(/[^\w\-. ]/g, '_').slice(0, 120);
  if (!/\.pdf$/i.test(name)) return { ok: false, err: 'nome file non valido' };
  const bytes = Utilities.base64Decode(String(b64 || ''));
  if (bytes.length > (merged ? MAX_MERGED : MAX_BYTES)) return { ok: false, err: 'file troppo grande' };
  if (!(bytes[0] === 37 && bytes[1] === 80 && bytes[2] === 68 && bytes[3] === 70)) return { ok: false, err: 'non è un PDF' };
  const same = folder.getFilesByName(name);
  if (same.hasNext()) { const f = same.next(); return { ok: true, id: f.getId(), url: f.getUrl(), dup: true }; }   // invio ripetuto: nessun doppione
  const f = folder.createFile(Utilities.newBlob(bytes, MimeType.PDF, name));
  return { ok: true, id: f.getId(), url: f.getUrl() };
}

function readReg_(folder) {
  const it = folder.getFilesByName(REG_NAME);
  if (!it.hasNext()) return [];
  try { const a = JSON.parse(it.next().getBlob().getDataAsString()); return Array.isArray(a) ? a : []; }
  catch (e) { return []; }
}
function writeReg_(folder, reg) {
  const it = folder.getFilesByName(REG_NAME), txt = JSON.stringify(reg);
  if (it.hasNext()) it.next().setContent(txt);
  else folder.createFile(REG_NAME, txt, 'application/json');
}
function cleanEntry_(x) {
  if (!x || typeof x !== 'object') return null;
  const s = function (v, n) { return String(v == null ? '' : v).slice(0, n); };
  const t = Number(x.t), k = Number(x.k);
  if (!isFinite(t) || !isFinite(k)) return null;
  return { name: s(x.name, 40), show: s(x.show, 40), k: k, full: s(x.full, 40), sig: s(x.sig, 40), t: t, pc: s(x.pc, 20) };
}
function inFolder_(file, folder) {
  const it = file.getParents(), id = folder.getId();
  while (it.hasNext()) if (it.next().getId() === id) return true;
  return false;
}
function withLock_(fn) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try { return fn(); } finally { lock.releaseLock(); }
}
function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
