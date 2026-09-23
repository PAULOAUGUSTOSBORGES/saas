# ==============================================================
# Servidor Web Local & Instalador PWA - SaaS Master
# Permite rodar em http://localhost:8085 e instalar como App Desktop
# ==============================================================

$port = 8085
$root = $PSScriptRoot
if ([string]::IsNullOrEmpty($root)) { $root = (Get-Location).Path }

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
} catch {
    Write-Host "Porta $port em uso, tentando porta 8086..." -ForegroundColor Yellow
    $port = 8086
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
}

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "  SAAS MASTER - SERVIDOR LOCAL ATIVO" -ForegroundColor Yellow
Write-Host "  Acesse: http://localhost:$port/login.html" -ForegroundColor Green
Write-Host "  (O botao 'Instalar App Master' ficara disponivel)" -ForegroundColor Green
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "Pressione CTRL+C nesta janela para encerrar o servidor." -ForegroundColor Gray

Start-Process "http://localhost:$port/login.html"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $url = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($url) -or $url -eq '/') {
            $url = "login.html"
        }

        $filePath = Join-Path $root $url

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()

            $contentType = "text/html"
            switch ($ext) {
                ".js"   { $contentType = "application/javascript" }
                ".css"  { $contentType = "text/css" }
                ".json" { $contentType = "application/json" }
                ".png"  { $contentType = "image/png" }
                ".jpg"  { $contentType = "image/jpeg" }
                ".jpeg" { $contentType = "image/jpeg" }
                ".svg"  { $contentType = "image/svg+xml" }
                ".ico"  { $contentType = "image/x-icon" }
            }

            $response.ContentType = "$contentType; charset=utf-8"
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Nao Encontrado")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }

        $response.Close()
    }
} finally {
    $listener.Stop()
}
