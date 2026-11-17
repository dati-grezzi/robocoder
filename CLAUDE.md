# Robot Coder — note per Claude

- L'app è `index.html`: un solo file con HTML, CSS e JS inline, senza build e senza librerie. È pubblicata con GitHub Pages dal branch `main`, nella root.
- Il backend è `apps-script/Codice.gs`. Al lo copia a mano in script.google.com, sull'account dedicato della scuola. Le azioni di `doPost` sono: ping, upload, registry, register, resetRegistry, list, get. Ogni richiesta contiene un `token`.
- Il repository è pubblico. Non mettere mai nel repository il CODICE dello script, PIN, nomi di bambini o indirizzi email della scuola. L'URL /exec non è segreto e può stare in `DRIVE_URL_DEFAULT`.
- Lingua: italiano, sia nell'interfaccia sia nei documenti.
- Prima di ogni push:
  - controllo della sintassi JS: estrai l'ultimo `<script>` e fai `new Function`;
  - test con Playwright in headless sulle parti toccate;
  - aggiornamento di `docs/ISTRUZIONI.md` se il comportamento cambia.
