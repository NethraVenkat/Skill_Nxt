@echo off
cd /d "%~dp0"
echo Echo Live! - Space Theatre
echo Open http://127.0.0.1:5400/ after the server starts.
call npm run dev -- --host 127.0.0.1 --port 5400 --strictPort
pause
