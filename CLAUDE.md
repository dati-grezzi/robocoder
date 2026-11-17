# Robot Coder — note per Claude

- L'app è `index.html`: un solo file con HTML, CSS e JS inline, senza build e senza librerie. È pubblicata con GitHub Pages dal branch `main`, nella root, all'indirizzo https://datigrezzi.it/robocoder/ (dominio dell'organizzazione dati-grezzi).
- Il backend è `apps-script/Codice.gs`. Al lo copia a mano in script.google.com, sull'account dedicato della scuola, e lo aggiorna con *Gestisci deployment → Nuova versione* (l'URL non cambia).
  - Azioni **pubbliche** (senza token): ping, upload, check, register. Upload e register funzionano solo con la raccolta aperta, con un tetto al giorno.
  - Azioni **docente** (con `token` = CODICE): stats, list, get, resetRegistry, setConfig.
- Sui PC non si configura niente. Il CODICE serve solo nell'area docente: resta in memoria, e sul PC si salva solo la sua impronta SHA-256 per l'accesso offline.
- Il registro non contiene nomi: contiene `nh` = SHA-256 di `'robocoder|'+nome`.
- Il repository è pubblico. Non mettere mai nel repository il CODICE dello script, PIN, nomi di bambini o indirizzi email della scuola. L'URL /exec non è segreto e può stare in `DRIVE_URL_DEFAULT`.
- Lingua: italiano, sia nell'interfaccia sia nei documenti.
- Prima di ogni push:
  - controllo della sintassi JS: estrai l'ultimo `<script>` e fai `new Function`;
  - test con Playwright in headless sulle parti toccate;
  - aggiornamento di `docs/ISTRUZIONI.md` se il comportamento cambia.
