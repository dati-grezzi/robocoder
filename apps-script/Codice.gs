/**
 * Robot Coder — ponte verso Google Drive per i ricordi
 * Istituto "Enrico Mestica" · Civitanova Marche
 * App:        https://datigrezzi.it/robocoder/
 * Repository: https://github.com/dati-grezzi/robocoder
 *
 * L'app vive su GitHub Pages. Questo script gira con l'account dedicato della scuola:
 * salva i ricordi PDF nella cartella Drive "Ricordi Open Day" e tiene lì il registro
 * anti-doppioni.
 *
 * Due livelli di accesso:
 *  - PUBBLICO (qualunque PC, senza configurare niente):
 *      ping, upload, check, register
 *    upload e register funzionano solo con la "raccolta" aperta, con un tetto al giorno.
 *    Il registro non contiene nomi in chiaro: solo un'impronta cifrata (SHA-256) del nome.
 *  - DOCENTE (con il CODICE):
 *      stats, list, get, resetRegistry, setConfig
 *    Il CODICE si scrive nell'area docente dell'app quando serve e non resta salvato sul PC.
 *
 * INSTALLAZIONE: vedi docs/ISTRUZIONI.md § 4 A.
 *  1. script.google.com con l'account dedicato → Nuovo progetto → incolla questo file.
 *  2. Esegui setup (autorizza Drive): il log mostra il link della cartella e il CODICE.
 *  3. Esegui il deployment → App web → Esegui come: Me · Chi ha accesso: Chiunque.
 *  Per cambiare il CODICE: esegui nuovoCodice.
 *  Dopo ogni modifica: Gestisci deployment → ✏ → Nuova versione (l'URL resta lo stesso).
 */

const FOLDER_NAME = 'Ricordi Open Day';
const REG_NAME = '_registro.json';
const MAX_BYTES = 8 * 1024 * 1024;        // un ricordo pesa circa 0,4 MB
const MAX_MERGED = 45 * 1024 * 1024;      // PDF unito
const MAX_UPLOAD_GIORNO = 400;            // tetto anti-abuso per i caricamenti pubblici
const MAX_REGISTRO = 5000;
const EVENTI_VALIDI = ['openday2627', 'laboratorio'];
const AZIONI_DOCENTE = { stats: 1, list: 1, get: 1, resetRegistry: 1, setConfig: 1 };

/* ---------- installazione ---------- */
function setup() {
  const p = PropertiesService.getScriptProperties();
  const folder = getFolder_(true);
  if (!p.getProperty('TOKEN')) p.setProperty('TOKEN', newToken_());
  if (!p.getProperty('RACCOLTA')) p.setProperty('RACCOLTA', 'aperta');
  if (!p.getProperty('EVENTO')) p.setProperty('EVENTO', 'openday2627');
  Logger.log('Cartella dei ricordi: ' + folder.getUrl());
  Logger.log('CODICE docente: ' + p.getProperty('TOKEN'));
}
function nuovoCodice() {
  const t = newToken_();
  PropertiesService.getScriptProperties().setProperty('TOKEN', t);
  Logger.log('Nuovo CODICE docente: ' + t);
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

function doPost(e) {
  try {
    const req = JSON.parse(e.postData.contents);
    const token = PropertiesService.getScriptProperties().getProperty('TOKEN');
    const docente = !!token && req.token === token;
    if (AZIONI_DOCENTE[req.action] && !docente) return out_({ ok: false, err: 'codice errato' });
    return out_(handle_(req, docente));
  } catch (err) {
    return out_({ ok: false, err: String(err && err.message || err) });
  }
}

function handle_(req, docente) {
  const p = PropertiesService.getScriptProperties();
  const folder = getFolder_(false);
  const aperta = p.getProperty('RACCOLTA') !== 'chiusa';

  switch (req.action) {
    /* ----- pubbliche ----- */
    case 'ping':
      return {
        ok: true, folderName: folder.getName(), evento: p.getProperty('EVENTO') || '',
        raccolta: aperta, admin: docente, folderUrl: docente ? folder.getUrl() : null
      };

    case 'upload':
      if (!aperta) return { ok: false, err: 'raccolta chiusa' };
      return withLock_(function () {
        if (!conta_(p)) return { ok: false, err: 'troppi caricamenti oggi' };
        return upload_(folder, req.name, req.b64, !!req.merged);
      });

    case 'check': {
      const nh = String(req.nh || '');
      const reg = readReg_(folder);
      return {
        ok: true, epoch: p.getProperty('EPOCH') || '',
        same: reg.filter(function (x) { return x.nh === nh; })
                 .map(function (x) { return { k: x.k, full: x.full, t: x.t, pc: x.pc }; }),
        fulls: reg.map(function (x) { return x.full; }),
        sigs: reg.map(function (x) { return x.sig; })
      };
    }

    case 'register':
      if (!aperta) return { ok: false, err: 'raccolta chiusa' };
      return withLock_(function () {
        const reg = readReg_(folder), seen = {};
        reg.forEach(function (x) { seen[x.pc + '|' + x.t] = true; });
        (req.entries || []).slice(0, 50).forEach(function (x) {
          const c = cleanEntry_(x);
          if (c && !seen[c.pc + '|' + c.t] && reg.length < MAX_REGISTRO) { reg.push(c); seen[c.pc + '|' + c.t] = true; }
        });
        writeReg_(folder, reg);
        return { ok: true, count: reg.length, epoch: p.getProperty('EPOCH') || '' };
      });

    /* ----- docente ----- */
    case 'stats':
      return { ok: true, count: readReg_(folder).length, raccolta: aperta, evento: p.getProperty('EVENTO') || '' };

    case 'setConfig':
      if (req.evento != null) {
        if (EVENTI_VALIDI.indexOf(String(req.evento)) < 0) return { ok: false, err: 'evento sconosciuto' };
        p.setProperty('EVENTO', String(req.evento));
      }
      if (req.raccolta != null) p.setProperty('RACCOLTA', req.raccolta ? 'aperta' : 'chiusa');
      return { ok: true, evento: p.getProperty('EVENTO'), raccolta: p.getProperty('RACCOLTA') !== 'chiusa' };

    case 'resetRegistry':
      return withLock_(function () {
        writeReg_(folder, []);
        const ep = Date.now().toString(36);
        p.setProperty('EPOCH', ep);
        return { ok: true, epoch: ep };
      });

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
      return { ok: true, name: f.getName(), b64: Utilities.base64Encode(f.getBlob().getBytes()) };
    }
  }
  return { ok: false, err: 'azione sconosciuta' };
}

/* ---------- funzioni interne ---------- */
function conta_(p) {
  const k = 'CNT_' + Utilities.formatDate(new Date(), 'Europe/Rome', 'yyyyMMdd');
  const n = Number(p.getProperty(k) || 0);
  if (n >= MAX_UPLOAD_GIORNO) return false;
  p.setProperty(k, String(n + 1));
  return true;
}

function upload_(folder, name, b64, merged) {
  name = String(name || '').replace(/[^\w\-. ]/g, '_').slice(0, 120);
  if (!/\.pdf$/i.test(name)) return { ok: false, err: 'nome file non valido' };
  const bytes = Utilities.base64Decode(String(b64 || ''));
  if (bytes.length > (merged ? MAX_MERGED : MAX_BYTES)) return { ok: false, err: 'file troppo grande' };
  if (!(bytes[0] === 37 && bytes[1] === 80 && bytes[2] === 68 && bytes[3] === 70)) return { ok: false, err: 'non è un PDF' };
  const same = folder.getFilesByName(name);
  if (same.hasNext()) { const f = same.next(); return { ok: true, id: f.getId(), dup: true }; }   // invio ripetuto: nessun doppione
  const f = folder.createFile(Utilities.newBlob(bytes, MimeType.PDF, name));
  return { ok: true, id: f.getId() };
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
  const t = Number(x.t), k = Number(x.k), nh = String(x.nh || '');
  if (!isFinite(t) || !isFinite(k) || !/^[0-9a-f]{64}$/.test(nh)) return null;
  return { nh: nh, k: k, full: s(x.full, 40), sig: s(x.sig, 40), t: t, pc: s(x.pc, 20) };
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
