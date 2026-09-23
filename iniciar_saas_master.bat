@echo off
title SaaS Master - Servidor Local PWA
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0iniciar_saas_master.ps1"
pause
