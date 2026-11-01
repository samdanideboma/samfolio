@echo off
cd /d "%~dp0"
powershell -NoProfile -Command "try { $response = Invoke-WebRequest 'http://127.0.0.1:4175/' -UseBasicParsing -TimeoutSec 2; if ($response.StatusCode -eq 200) { exit 0 } } catch {}; exit 1"
if not errorlevel 1 (
  start "" http://127.0.0.1:4175/
  exit /b 0
)
"C:\Users\samda\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" node_modules\vite\bin\vite.js --host 127.0.0.1 --port 4175 --strictPort --open
pause
