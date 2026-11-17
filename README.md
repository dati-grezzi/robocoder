# Robot Coder 🤖

Laboratorio di coding per l'**Open Day** dell'Istituto "Enrico Mestica" di Civitanova Marche.

**App:** https://datigrezzi.it/robocoder/

Il bambino scrive il suo nome. L'app lo traduce in binario ed esadecimale e da quei numeri ricava un robot unico, che poi il bambino programma scrivendo codice vero: variabili, cicli, condizioni, output.
- La **Console** racconta riga per riga che cosa fa il programma.
- La scheda **Dentro il robot** mostra gli impulsi elettrici che il codice genera.
- A fine attività ogni bambino riceve un **ricordo PDF A4**.

## Struttura

| Percorso | Contenuto |
|---|---|
| `index.html` | L'app: un solo file, senza dipendenze, pubblicato con GitHub Pages |
| `apps-script/Codice.gs` | Ponte Google Apps Script: salva i ricordi PDF e il registro anti-doppioni in una cartella Google Drive della scuola |
| `avvio/` | File da copiare sul desktop dei PC del laboratorio |
| `docs/ISTRUZIONI.md` | Istruzioni complete per docenti e tutor (installazione, giornata, problemi) |
| `legacy/` | Versione precedente, solo per emergenza |

## Dati

Su GitHub c'è solo il programma, nessun dato.
- I ricordi (nome del bambino e disegno) vanno **solo** nella cartella Drive della scuola, attraverso lo script.
- Lo script accetta solo richieste che contengono un codice. Il codice si inserisce sui PC e non è nel repository.

## Licenza

GPL-3.0
