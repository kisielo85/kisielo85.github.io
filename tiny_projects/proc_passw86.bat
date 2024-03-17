@echo off
set/a ishmxslwgc=1
:start
set/p quedmvnsmu=podaj haslooo:
set eq==
set sp= 
for /f "skip%eq%%ishmxslwgc%%sp%tokens%eq%*" %%a In (%~n0%~x0) do set "knwycivlnv%eq%%%a" & goto:next
:next
if "%quedmvnsmu%" equ "%knwycivlnv%" ( set/a ishmxslwgc+=1
) ELSE ( set/a ishmxslwgc=1 )
if %ishmxslwgc% lss 17 goto start
color a
:end
cls
echo gratulacje uzytkowniku, wygrales iphone 13
pause>nul
goto end







