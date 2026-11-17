# Robot Coder — Istruzioni per l'Open Day

**Laboratorio di coding · Istituto "Enrico Mestica" · Civitanova Marche**
Referente: prof. Al (matematica). Questo documento serve a chiunque debba gestire il laboratorio al suo posto.

> **Dove si trova:** Robot Coder è una pagina web pubblicata su GitHub: **https://datigrezzi.it/robocoder/**. I ricordi PDF finiscono nella cartella Drive **Ricordi Open Day** dell'account dedicato della scuola, tramite un piccolo script Google (§ 4 A). Il codice sorgente è in https://github.com/dati-grezzi/robocoder.
>
> **In breve:** ogni bambino scrive il suo nome, l'app lo trasforma in binario ed esadecimale e ne ricava un robot unico. Il bambino lo programma scrivendo codice e vede gli impulsi elettrici che il codice genera. Alla fine scarica un ricordo PDF A4. A fine giornata il docente unisce tutti i PDF in un unico file e lo stampa.

---

## 1. Cosa serve

| Cosa | Dettaglio |
|---|---|
| Indirizzo dell'app | **https://datigrezzi.it/robocoder/** |
| Browser | **Google Chrome** o **Microsoft Edge** |
| Internet | Necessario per aprire l'app e salvare su Drive. Se cade durante il laboratorio, l'app già aperta continua a funzionare e i ricordi vanno nella cartella Download del PC |
| Account Google | `[DA COMPILARE: account dedicato della scuola]`: contiene lo script **Robot Coder Drive** e la cartella Drive **Ricordi Open Day**. **Non** va aperto sui PC del laboratorio |
| Script "Robot Coder Drive" | File `apps-script/Codice.gs` del repository, pubblicato come App web dall'account dedicato (§ 4 A) |
| URL dello script | Già inserito nell'app (`DRIVE_URL_DEFAULT` in `index.html`): sui PC non va configurato niente |
| CODICE docente | 12 caratteri: serve **solo** per entrare nell'area docente. **Non scriverlo qui** (questo documento è pubblico): comunicarlo a voce al tutor e a chi sostituisce. Si legge nel *Log di esecuzione* della funzione `setup` |
| PC del laboratorio | `[DA COMPILARE: quanti / quali]` |
| Stampante | `[DA COMPILARE: quale, dove]` |
| Audio | Casse o, meglio, **cuffie** per ogni PC: il robot parla (vedi § 5) |
| Chiavetta USB (riserva) | Con la cartella `RobotCoder_offline` (§ 4 E), solo per il caso senza internet |

---

## 2. Dove finiscono i ricordi

```
Google Drive dell'account dedicato
└── Il mio Drive
    └── Ricordi Open Day                                ← collegamento "Ricordi Open Day" sul desktop
        ├── 2026-11-14_10-52-32_Giulia_G5B.pdf           ← un ricordo per bambino
        ├── 2026-11-14_10-52-49_Anna_Maria_A88.pdf          (nome = data_ora_nome_sigla)
        ├── 2026-11-14_10-53-05_Luca_L85.pdf
        ├── …
        ├── Ricordi_OpenDay_2026-11-14_17-30-00_48pagine.pdf   ← PDF unico da stampare
        └── _registro.json                               ← NON TOCCARE: elenco dei robot creati
```

- I PDF arrivano su Drive **appena il bambino preme "Scarica PDF A4"**, da tutti i PC, senza che sui PC sia aperto alcun account Google: li salva lo script, che lavora come account dedicato.
- **Su GitHub non finisce nessun dato dei bambini**: lì c'è solo il programma.
- I file `.pdf` sono in **ordine di creazione** grazie a data e ora nel nome.
- `_registro.json` serve a garantire che **non ci siano due robot uguali**, anche tra omonimi e su PC diversi.
- **Paracadute:** se internet o Drive non rispondono, il PDF finisce nella cartella **Download** di quel PC (vedi § 8) e il robot viene comunque registrato appena Drive torna raggiungibile.

---

## 3. Area docente (riservata)

Le funzioni del docente **non sono visibili ai bambini** e si aprono solo con il **CODICE docente**.

- **Come si apre:** premere **Ctrl + Alt + D** (in qualsiasi schermata), oppure **tenere premuto per 2 secondi** il titolo "Robot Coder" nella schermata iniziale.
- **Codice:** scrivere il CODICE docente. Lo verifica lo script: **non va impostato su nessun PC** e non resta salvato (sul PC rimane solo un'impronta cifrata, che permette di entrare anche se poi manca internet).
- Dopo **5 tentativi sbagliati** l'area si blocca per 1 minuto.
- **Chiudi e blocca** (o il tasto **Esc**) richiude l'area: per riaprirla serve di nuovo il codice.

Contenuto dell'area docente:

| Voce | A cosa serve |
|---|---|
| ☁ Cartella Drive | Stato del collegamento: ✓ collegata oppure ⚠ non raggiungibile |
| ☁ Cartella Drive → **Apri** | Apre la cartella Drive nel browser (serve essere collegati con l'account dedicato) |
| ☁ Cartella Drive → **🖥 Collegamento sul desktop** | Crea sul desktop il file `Ricordi Open Day.url`: doppio clic → si apre la cartella Drive |
| 📥 **Raccolta dei ricordi** | Casella *aperta/chiusa*, vale **per tutti i PC**. Aperta: i PC salvano i ricordi su Drive. Chiusa: nessuno può caricare file su Drive (i ricordi vanno in Download). Tenerla **aperta solo nei giorni in cui si usa l'app** |
| 📁 Cartella locale → **Scegli cartella** | Alternativa senza internet: salva i PDF in una cartella del PC o su chiavetta |
| 🗂 **Unisci ricordi** | Crea il PDF unico da stampare (§ 7) |
| 🎫 **Evento** | Sceglie intestazione e titolo del ricordo PDF: **Open Day 2026/27** (predefinito) oppure **Laboratorio di coding**. Vale **per tutti i PC** (si aggiornano alla riapertura) |
| 📋 Registro robot | Quanti robot sono registrati su Drive e su questo PC |
| 🧹 Azzera il registro → **Solo questo PC** / **Tutti i PC** | Cancella l'elenco dei robot già creati. Va usato **dopo le prove e prima dell'open day**, **mai durante**. Chiede conferma con un secondo clic |

**Senza internet:** su un PC dove il docente è già entrato almeno una volta, il codice funziona anche offline. Su un PC mai usato, senza internet l'app chiede di creare un **PIN locale** valido solo su quel PC.

**Cambiare il codice** (es. se un bambino l'ha visto): in script.google.com eseguire la funzione **`nuovoCodice`**. Il nuovo codice vale subito su tutti i PC.

---

### Eventi e ricordi

Robot Coder nasce per l'Open Day, ma resta disponibile come palestra di coding. Il ricordo PDF cambia in base all'**evento** scelto nell'area docente:

| Evento | Intestazione del PDF | Titolo |
|---|---|---|
| Open Day 2026/27 | ISTITUTO "ENRICO MESTICA" · OPEN DAY 2026/27 | PATENTE DI ROBOT CODER, rilasciata a… |
| Laboratorio di coding | ISTITUTO "ENRICO MESTICA" · LABORATORIO DI CODING | ATTESTATO DI ROBOT CODER, conseguito da… |

Per un nuovo evento (es. Open Day 2027/28) si aggiunge una riga all'elenco `EVENTI` in `index.html` e la si pubblica su GitHub.

---

## 4. Preparazione (giorni prima)

**A. Lo script Drive (una volta sola, dal PC del docente)**

1. Accedere a **script.google.com** con l'**account dedicato** → **Nuovo progetto** → nome **Robot Coder Drive**.
2. Cancellare il contenuto di `Codice.gs` e incollare tutto il file **`apps-script/Codice.gs`** del repository. Salvare.
3. In alto scegliere la funzione **`setup`** → **▶ Esegui** → autorizzare l'accesso a Drive (*Avanzate → Vai a Robot Coder Drive* se compare l'avviso).
   Nel **Log di esecuzione** compaiono il link della cartella **Ricordi Open Day** (creata ora) e il **CODICE**.
4. **Esegui il deployment → Nuovo deployment** → ingranaggio → **App web**:
   - *Esegui come:* **Me** ← i ricordi vanno nel Drive di chi esegue
   - *Chi ha accesso:* **Chiunque** ← i PC non accedono a Google; salvare i ricordi è libero (solo con la raccolta aperta), tutto il resto richiede il CODICE
   → copiare l'**URL** `/exec`.
5. L'URL va scritto in `index.html` (`DRIVE_URL_DEFAULT`) e pubblicato su GitHub. **È già fatto** per lo script attuale.
6. **Aggiornare lo script in futuro:** *Gestisci deployment → ✏ → Nuova versione*. Così l'URL non cambia. (Non usare "Nuovo deployment".)
7. Per cambiare il CODICE (es. se è stato diffuso): eseguire **`nuovoCodice`**. Vale subito ovunque.

**B. Ogni PC del laboratorio: niente da fare**

Non c'è niente da installare né da configurare: basta aprire Chrome (o Edge) e andare su **datigrezzi.it/robocoder**.

Facoltativo, per comodità:
- **icona sul desktop:** su quella pagina, in Chrome: ⋮ → **Trasmetti, salva e condividi → Crea scorciatoia…** → spuntare **Apri come finestra** → l'app si apre in una finestra pulita senza barre;
- **sul PC del docente:** area docente → **🖥 Collegamento sul desktop** per avere la cartella Drive a portata di doppio clic.

**C. Prova generale (10 minuti)**

1. Su un PC creare un robot di prova → **🖨 Il mio ricordo** → **⬇ Scarica PDF A4**. Il messaggio deve dire *"Salvato nella cartella Drive…"*.
2. Dal PC del docente aprire la cartella Drive: il PDF deve esserci.
3. Su un **secondo PC** usare lo **stesso nome**: deve comparire *"Questo nome c'è già! Sei tu?"*.
4. **Prova del paracadute:** con l'app aperta, staccare la rete e creare un ricordo: deve comparire il messaggio arancione e il PDF deve finire in **Download**. Riattaccare la rete.
5. Area docente → **Unisci ricordi** → **☁ Dalla cartella Drive** → **Crea PDF unico** → stampare.

**D. Pulire dopo la prova** (altrimenti i robot di prova restano "occupati"):
- cancellare dalla cartella Drive i PDF di prova (non `_registro.json`);
- area docente → 🧹 Azzera il registro → **Tutti i PC** (due clic). Gli altri PC si allineano da soli.

**E. Paracadute senza internet (chiavetta)**

Da preparare prima e tenere a portata di mano, anche se non servirà. Sulla chiavetta va la cartella **`RobotCoder_offline`** con:
- `RobotCoder.html` (è `index.html` del repository, rinominato);
- `Avvia Robot Coder OFFLINE.cmd` (cartella `offline/` del repository);
- `LEGGIMI.txt` (le istruzioni brevi, stessa cartella).

Se internet non funziona:
1. su ogni PC copiare la cartella `RobotCoder_offline` sul **Desktop** (oppure avviare direttamente dalla chiavetta, ma poi va lasciata inserita);
2. doppio clic su **Avvia Robot Coder OFFLINE.cmd**: l'app si apre in una finestra senza barre. Non serve configurare niente, l'evento Open Day 2026/27 è già impostato;
3. funziona tutto (robot, codice, Console, impulsi, voce, ricordo PDF); **i ricordi vanno nella cartella Download** di ogni PC;
4. a fine giornata: da ogni PC copiare i PDF dei ricordi dalla cartella Download alla chiavetta; poi sul PC del docente **Unisci ricordi → Scegli file PDF** (o **Scegli cartella**) → **Crea PDF unico** → stampare. Quando internet torna, caricare i PDF nella cartella Drive trascinandoli in drive.google.com.

⚠ **Limite:** senza internet ogni PC conosce solo i propri robot, quindi due bambini con lo stesso nome **su PC diversi** possono ricevere lo stesso robot. Sullo stesso PC resta tutto unico.

Se invece internet cade **a metà giornata** con l'app già aperta, non serve la chiavetta: l'app se ne accorge subito, mette i ricordi in Download senza attese e torna su Drive da sola quando la rete riprende.

---

## 5. Il giorno dell'Open Day — avvio (prima che arrivino i bambini)

Su **ogni PC**:

1. Aprire **datigrezzi.it/robocoder** (o l'icona, se creata).
2. Opzionale: mettere il browser a schermo intero con **F11**.

**Una volta sola, da un PC qualsiasi:** area docente (**Ctrl + Alt + D** + codice) → controllare *☁ «Ricordi Open Day» ✓ collegata*, **📥 Raccolta: aperta**, **🎫 Evento: Open Day 2026/27** → **Chiudi e blocca**.

5. Verificare l'audio. Il robot **parla**: ogni messaggio `di("…")` viene scritto e detto ad alta voce, e ogni robot ha un tono di voce diverso. In alto ci sono due tasti:
   - **🗣 Voce / 🤐 Voce** accende o spegne la voce del robot;
   - **🔊 / 🔇** accende o spegne i suoni (bip, errori).
   Con molti PC nella stessa aula conviene usare le cuffie, oppure tenere la voce accesa solo su alcuni PC.
   La voce usa la sintesi vocale di Windows e funziona senza internet. Se non si sente nulla: controllare il volume e che in Windows sia installata una voce italiana (*Impostazioni → Ora e lingua → Voce*). Se manca la voce, l'app funziona lo stesso: i messaggi restano scritti.

---

## 6. Percorso di ogni bambino (5–10 minuti)

1. **Nome** → il bambino scrive il suo nome e preme **Crea il mio robot ⚡**.
   - Se compare *"Questo nome c'è già!"*:
     - se il bambino **è già passato** (ha ricominciato per sbaglio) → **"✋ Sono io"**;
     - se è **un altro bambino con lo stesso nome** → **"No, sono un'altra persona"**: riceve un robot diverso con un **numero di serie** (#2, #3…).
2. **Traduzione del nome**: l'app mostra lettera → numero → binario → esadecimale, poi i calcoli che generano la sigla (es. `G5B`) e il nome del robot (es. `Turbina`). Premere **Programmami! ▶**.
3. **Programmazione**: a sinistra il codice, a destra il robot.
   - Il bambino **cambia i numeri** e preme **▶ Esegui** (oppure **Ctrl+Invio**).
   - **■ Stop** ferma il robot (indispensabile con `per sempre:`).
   - Se sbaglia a scrivere, il codice "si corrompe", il robot va in tilt e compare la spiegazione dell'errore con un suggerimento. Si può correggere oppure premere **↺ Ripristina** per tornare al codice iniziale.
   - Il riquadro di destra ha **tre schede**, tre modi di guardare lo stesso programma:
     - **🤖 Arena** — il robot che si muove, grande. Il tasto **🏆 Sfide** (in alto a destra) apre l'elenco delle sfide.
     - **🖥 Console** — il programma racconta riga per riga cosa sta facendo, con i valori veri: `lato = lato + 10 → 20 + 10 = 30`, `finché lato < 250 ? → 30 < 250 → vero, giro 3`. A destra la **Memoria** (le variabili come scatole, che lampeggiano quando cambiano) e la posizione del robot in **coordinate x, y** e **direzione in gradi**. Una mini-arena mostra il robot.
     - **⚡ Dentro il robot** — l'oscilloscopio grande con gli impulsi elettrici e la spiegazione, più la mini-arena.
   - Il tasto **📖 Comandi**, nella barra del codice, apre l'elenco dei comandi sopra il riquadro di destra (il codice resta visibile).
4. **Ricordo**: **🖨 Il mio ricordo** (in alto) → anteprima → **⬇ Scarica PDF A4**.
   - Prima conviene far eseguire un programma: il disegno del robot finisce nel PDF. La casella *"Metti anche il mio disegno"* permette di toglierlo.
5. **Bambino successivo**: **👋 Nuovo bambino** (in alto a destra).

---

### Adesivi badge (per i tutor o per i bambini)

Nella finestra **🖨 Il mio ricordo** c'è anche **🏷 Adesivi badge**: un foglio A4 di adesivi con il robot, la scritta **OPEN DAY MESTICA** in alto (o **CODING LAB MESTICA** per l'evento Laboratorio) e il nome **in binario** in basso, con l'esadecimale in piccolo.
- Formati: **tondi Ø 64 mm** (12 per foglio) oppure **rettangolari 85×55 mm** (10 per foglio, misura da porta-badge).
- Il PDF va in **Download** (non su Drive) e non entra in "Unisci ricordi".
- Stampare su carta adesiva A4 **al 100 %** (non "Adatta alla pagina"), poi ritagliare lungo le linee tratteggiate.
- Nei badge tondi un nome lungo mostra solo le prime righe in binario, seguite da "…".

---

## 7. Fine giornata — unire e stampare

Dal PC del docente (o da qualsiasi PC con Chrome/Edge):

1. Aprire **Robot Coder** dall'icona.
2. Area docente (**Ctrl + Alt + D** + codice) → **Unisci ricordi**.
3. **☁ Dalla cartella Drive** → l'app legge tutti i ricordi della cartella Drive.
   In alternativa: **📄 Scegli file PDF** e selezionare i file a mano (ad esempio quelli finiti in Download sui singoli PC), oppure **📁 Scegli cartella** per una cartella locale.
4. **⬇ Crea PDF unico** → viene creato `Ricordi_OpenDay_<data-ora>_<N>pagine.pdf`, una pagina A4 per bambino: viene **scaricato in Download** (pronto per la stampa) e **salvato anche nella cartella Drive**.

   Se alcuni ricordi sono finiti in Download sui PC (Drive irraggiungibile), conviene prima caricarli a mano nella cartella Drive (trascinandoli in drive.google.com con l'account dedicato), poi unire.
5. Aprire il PDF e stamparlo **una sola volta**: formato **A4**, scala **"Adatta alla pagina" / 100 %**, a colori se possibile (la pagina ha sfondo bianco e consuma poco inchiostro).

L'unione ignora automaticamente i file che non sono ricordi e i PDF già uniti, quindi si può ripetere più volte senza creare doppioni.

---

## 8. Problemi e soluzioni

| Cosa succede | Cosa fare |
|---|---|
| Messaggio arancione **"La cartella Drive non risponde, ma il ricordo non è perso"** | Il PDF è nella cartella **Download** di quel PC. In alto compare un avviso giallo con il numero di file finiti lì. Il lavoro continua normalmente. Quando internet torna, l'app si ricollega da sola (entro un minuto). A fine giornata caricare quei PDF nella cartella Drive, oppure selezionarli a mano in "Unisci ricordi". |
| L'app **non si apre** | Controllare internet. Provare ad aprire **datigrezzi.it/robocoder** in Chrome. Se GitHub non risponde: usare la chiavetta (§ 4 E). |
| I ricordi vanno in Download anche se internet funziona | La **raccolta** è chiusa: area docente → 📥 spuntare *aperta*. |
| Area docente: Drive **⚠ non raggiungibile (risposta non valida)** | URL dello script sbagliato o deployment rimosso: verificare l'URL `/exec` in script.google.com → *Gestisci deployment*. |
| Area docente: Drive **⚠ non raggiungibile** (altro) | Controllare internet sul PC. Se non si risolve si va avanti: i PDF vanno in Download. |
| Il collegamento sul desktop chiede di accedere a Google | Normale: la cartella è nel Drive dell'account dedicato. Accedere con quell'account **solo sul PC del docente**. |
| Internet non funziona per niente | Se l'app era già aperta, si lavora lo stesso: i ricordi vanno in Download. Altrimenti usare il file di riserva su chiavetta (§ 4 E). L'unicità dei robot vale solo tra PC che condividono la stessa cartella. |
| Il robot **non si muove** / il codice è un disastro | **↺ Ripristina** riporta il codice iniziale. |
| Il robot **gira all'infinito** | **■ Stop**. |
| Un bambino ha chiuso la pagina per sbaglio | Riaprire dall'icona, riscrivere il nome, scegliere **"✋ Sono io"**: ritrova lo stesso robot. Il disegno però va rifatto. |
| La pagina si blocca | Chiudere la finestra e riaprire. Il registro resta memorizzato. |
| L'area docente non si apre con Ctrl + Alt + D | Usare la pressione lunga (2 s) sul titolo "Robot Coder" nella schermata iniziale (👋 Nuovo bambino per tornarci). |
| Un bambino ha trovato l'area docente | Senza codice non può fare nulla. Se il codice è stato visto: eseguire **`nuovoCodice`** in script.google.com (§ 3). |
| Codice dimenticato | In script.google.com (account dedicato) eseguire **`setup`**: il log mostra il codice attuale. |
| Il robot non parla | Tasto **🗣 Voce** acceso? Volume del PC? Voce italiana installata in Windows (*Impostazioni → Ora e lingua → Voce*)? Senza voce l'app funziona comunque. |
| Troppo rumore in aula | Spegnere la voce con **🗣 Voce** sui PC senza cuffie. |
| I caratteri sembrano diversi dal solito | Normale senza internet: l'app usa un carattere di sistema. Tutto funziona lo stesso. |
| La stampante non stampa il PDF unito | Aprirlo con un altro lettore PDF (Edge, Acrobat) e ristampare. Ogni ricordo è comunque anche un PDF singolo nella cartella. |

---

## 9. Cosa spiegare ai bambini (traccia per chi sostituisce)

**Le parti di un programma.** Il codice iniziale è diviso in sezioni numerate e colorate, le stesse etichette usate nelle sfide:

| Sezione | Cosa contiene | Concetto da spiegare |
|---|---|---|
| **1 · VARIABILI** | `velocita = 5`, `lato = 120`, `angolo = 90` | Una variabile è una "scatola" con un nome che contiene un valore. Cambi il numero nella scatola e cambia tutto il programma. |
| **2 · PENNA** | `colore(...)`, `spessore(...)` | Impostazioni: preparano il robot prima di partire. |
| **3 · OUTPUT** | `di("...")` | Output: il programma comunica qualcosa all'esterno. Qui in due modi: lo scrive sullo schermo e lo dice con la voce (output video e audio). |
| **4 · CICLO** | `ripeti 4 volte:` + righe spostate a destra | Un ciclo ripete le istruzioni. Le righe "dentro" il ciclo si riconoscono perché sono spostate a destra (indentazione). |
| **5 · FINE** | `di("Fatto!…")` | Le istruzioni fuori dal ciclo vengono eseguite una volta sola, dopo. |

Le righe che iniziano con `#` sono **commenti**: il robot non le legge, servono alle persone per capire il codice.

**Il nome diventa numeri.** Il computer conosce solo due cose: **1 = passa corrente**, **0 = non passa corrente**. Ogni lettera ha un numero (codice ASCII: `G` = 71), che si scrive in **binario** con 8 cifre (`01000111`) e in **esadecimale** con 2 cifre (`47`). Anche lo spazio è un carattere: 32 → `00100000` → `20`.

**Il robot nasce dai calcoli.** Sigla = iniziale + ultime due cifre esadecimali della somma dei numeri. Nome = ultima cifra dello XOR (i byte "mescolati"). Colore e forme vengono anch'essi dai numeri: stesso nome, stesso robot. Per gli omonimi si aggiunge un **numero di serie** come byte in più, e il robot cambia.

**La Console: come "pensa" il computer.** Nella scheda 🖥 Console si vede che il computer esegue **una riga alla volta, dall'alto in basso**, che una variabile **cambia valore** (la scatola "lato" passa da 10 a 20 a 30…) e soprattutto **perché un ciclo finisce**: `finché lato < 250 ? → 250 < 250 → falso, esco dal ciclo`. Con un errore, il racconto si interrompe proprio alla riga sbagliata. Le coordinate x, y e la direzione in gradi sono un aggancio diretto al piano cartesiano e agli angoli.

**Il codice diventa impulsi elettrici.** Nella scheda ⚡ Dentro il robot c'è un oscilloscopio:
- **DATI**: ogni istruzione diventa byte, poi bit, poi impulsi tra 0 V e 3,3 V.
- **MOTORE A / B**: i motori ricevono impulsi rapidissimi acceso-spento (**PWM**). Impulsi più lunghi = motore più veloce (provare a cambiare `velocita`). Per girare, un motore va avanti e l'altro indietro: gli impulsi vanno sotto la linea, cioè la corrente va al contrario.
- **Il LEGO SPIKE fa la stessa cosa**: il codice diventa impulsi che l'hub manda ai motori nei cavi.
- Nota per il docente: i codici dei comandi (01 = avanti, 03 = destra…) sono **inventati a scopo didattico**. Il principio è corretto, ma non è il protocollo reale dello SPIKE.

**Un errore blocca tutto.** Una sola parola sbagliata e il programma non funziona: per questo il codice "si corrompe" e il robot va in tilt. È il momento giusto per far notare quanto conta scrivere con precisione.

---

## 10. Comandi del linguaggio (promemoria)

```python
# Movimento
avanti(100)          indietro(50)
destra(90)           sinistra(90)          centro()

# Tempo e parole
attendi(1)           di("ciao")

# Disegno
colore("blu")        # rosso, arancione, giallo, verde, azzurro, blu, viola,
                     # rosa, nero, marrone, grigio, oro, arcobaleno
spessore(8)          penna_su()    penna_giu()    cancella()

# Variabili
lato = 100
lato = lato + 10
velocita = 5         # speciale: da 1 (lento) a 20 (istantaneo)
angolo = casuale(60, 170)

# Cicli (le righe dentro vanno spostate a destra con il tasto Tab)
ripeti 4 volte:
    avanti(lato)
    destra(90)

finché lato < 200:
    avanti(lato)
    destra(90)
    lato = lato + 10

per sempre:          # si ferma solo con ■ Stop
    avanti(50)
    destra(casuale(30, 150))

# Decisioni
se lato > 100:
    di("grande!")
altrimenti:
    di("piccolo")
```

**Sfide da proporre** (come compaiono nella scheda 🏆 Sfide, con la sezione in cui intervenire).

Nei **poligoni l'angolo non è scritto**: il bambino deve scoprirlo. Ogni sfida ha un **💡 Indizio** e una **🔑 Soluzione** da aprire solo se serve. Il tutor non dovrebbe dare subito la soluzione: è meglio far provare e far leggere la risposta del robot.

**Il robot verifica da solo.** Quando un programma disegna lati tutti uguali, alla fine il robot dice:
- *"Figura chiusa! Hai trovato l'angolo giusto"*, e nella Console: `ho girato in tutto 360° = un giro completo`;
- oppure *"La figura non si chiude. Prova un altro angolo!"*, e nella Console: `ho girato in tutto 300°. Per chiudere un poligono servono 360°`;
- se il robot sbatte contro il muro: *"prova un lato più corto"*.

È il cuore matematico della sfida: **la somma delle curve deve fare 360°**, quindi l'angolo è 360 diviso il numero di lati. La stella fa eccezione: si chiude con 720°, cioè due giri. Ottimo spunto per i più bravi.


| Sfida | Cosa cambiare |
|---|---|
| 🔺 Triangolo | **4 · Ciclo**: `ripeti 3 volte:` · **1 · Variabili**: `angolo = ?` **da scoprire** (soluzione: 120, perché 360 ÷ 3) |
| ⬠ Pentagono | **4 · Ciclo**: `ripeti 5 volte:` · **1 · Variabili**: `angolo = ?` da scoprire, `lato = 100` (soluzione: 72) |
| ⬡ Esagono arcobaleno | **4 · Ciclo**: `ripeti 6 volte:` · **1 · Variabili**: `angolo = ?` da scoprire, `lato = 80` · **2 · Penna**: `colore("arcobaleno")` (soluzione: 60) |
| ⭐ Stella | **4 · Ciclo**: `ripeti 5 volte:` · **1 · Variabili**: `angolo = 144`, `lato = 180` |
| 🌀 Spirale | **1 · Variabili**: `lato = 10`, `velocita = 15` · **4 · Ciclo**: sostituire `ripeti 4 volte:` con `finché lato < 250:` e aggiungere in fondo al ciclo (spostata a destra come le altre) `lato = lato + 10` |
| ⚡ Velocità | **1 · Variabili**: `velocita = 1`, poi `velocita = 20` (guardare gli impulsi dei motori nella scheda ⚡ Dentro il robot) |
| 💬 Il robot parla | **3 · Output**: cambiare il testo di `di("…")` · **4 · Ciclo**: aggiungere dentro `di("giro!")` |
| 🎲 Sorpresa | **4 · Ciclo**: sostituire `ripeti 4 volte:` con `per sempre:` e aggiungere dentro `angolo = casuale(60, 170)` (si ferma con ■ Stop) |
| 💥 Rompilo! | **4 · Ciclo**: scrivere `avnti` invece di `avanti` → Esegui → leggere l'errore → **↺ Ripristina** |

---

## 11. Dati e privacy

- L'app è pubblicata su GitHub ma **non invia nulla a GitHub**: i ricordi vanno **solo** allo script dell'account dedicato della scuola, che li salva nella cartella Drive (Google Workspace della scuola). Nessun altro servizio riceve dati.
- Nei PDF compaiono **solo il nome** del bambino (niente cognome se non viene scritto) e l'orario.
- Il registro anti-doppioni **non contiene nomi**: solo un'impronta cifrata (SHA-256) del nome e il nome del robot.
- Lo script accetta caricamenti senza codice solo con la **raccolta aperta** e al massimo 400 al giorno; leggere, unire o cancellare i ricordi richiede il codice docente.
- Dopo l'Open Day, una volta stampati i ricordi, si possono **cancellare** i PDF dalla cartella Drive e il file `_registro.json`. Volendo, si può anche disattivare lo script (*Gestisci deployment → Archivia*).

---

## 12. Versioni, aggiornamenti e backup

- Tutto è nel repository **https://github.com/dati-grezzi/robocoder**:
  - `index.html` — l'app (pubblicata automaticamente su GitHub Pages);
  - `apps-script/Codice.gs` — lo script Drive (da copiare in script.google.com, § 4 A);
  - `avvio/` — file di avvio facoltativi (finestra senza barre);
  - `offline/` — avvio e istruzioni del paracadute senza internet (§ 4 E);
  - `docs/ISTRUZIONI.md` — questo documento;
  - `legacy/RobotCoder_v1.html` — versione precedente, solo per emergenza.
- **Aggiornamenti dell'app:** si pubblicano su GitHub e arrivano a tutti i PC alla riapertura (Ctrl + F5 per forzare).
- **Aggiornamenti dello script:** incollare il nuovo `apps-script/Codice.gs` in script.google.com → *Gestisci deployment → ✏ → Nuova versione* (l'URL non cambia).
- GitHub conserva la cronologia: ogni versione precedente si può recuperare.
