@echo off
rem ============================================================
rem  Robot Coder - avvio come finestra-app (Chrome o Edge)
rem  Istituto "Enrico Mestica" - Open Day
rem
rem  Copiare questo file sul desktop dei PC del laboratorio.
rem  Doppio clic: apre Robot Coder in una finestra senza barre.
rem ============================================================
set "URL=https://datigrezzi.it/robocoder/"

set "CH1=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
set "CH2=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
set "CH3=%LocalAppData%\Google\Chrome\Application\chrome.exe"
set "ED1=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
set "ED2=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"

if exist "%CH1%" ( start "" "%CH1%" --app="%URL%" --start-maximized & exit /b )
if exist "%CH2%" ( start "" "%CH2%" --app="%URL%" --start-maximized & exit /b )
if exist "%CH3%" ( start "" "%CH3%" --app="%URL%" --start-maximized & exit /b )
if exist "%ED1%" ( start "" "%ED1%" --app="%URL%" --start-maximized & exit /b )
if exist "%ED2%" ( start "" "%ED2%" --app="%URL%" --start-maximized & exit /b )

rem nessun Chrome/Edge trovato: apre con il browser predefinito
start "" "%URL%"
