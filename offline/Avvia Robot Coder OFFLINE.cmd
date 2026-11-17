@echo off
rem ============================================================
rem  Robot Coder - VERSIONE OFFLINE (senza internet)
rem  Tenere questo file nella STESSA cartella di RobotCoder.html.
rem  Doppio clic: apre Robot Coder in una finestra senza barre.
rem  I ricordi PDF vanno nella cartella Download di questo PC.
rem ============================================================
set "F=%~dp0RobotCoder.html"
if not exist "%F%" (
  echo.
  echo  Non trovo RobotCoder.html nella stessa cartella di questo file.
  echo.
  pause
  exit /b
)
set "U=file:///%F:\=/%"

set "CH1=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
set "CH2=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
set "CH3=%LocalAppData%\Google\Chrome\Application\chrome.exe"
set "ED1=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
set "ED2=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"

if exist "%CH1%" ( start "" "%CH1%" --app="%U%" --start-maximized & exit /b )
if exist "%CH2%" ( start "" "%CH2%" --app="%U%" --start-maximized & exit /b )
if exist "%CH3%" ( start "" "%CH3%" --app="%U%" --start-maximized & exit /b )
if exist "%ED1%" ( start "" "%ED1%" --app="%U%" --start-maximized & exit /b )
if exist "%ED2%" ( start "" "%ED2%" --app="%U%" --start-maximized & exit /b )

start "" "%F%"
