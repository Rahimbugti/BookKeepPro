# Simple Local HTTP Server for Bookkeeping Pricing Calculator
param (
    [int]$Port = 3000
)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
try {
    $listener.Start()
    Write-Host "Server running at http://localhost:$Port/ (Press Ctrl+C to stop)"
    Start-Process "http://localhost:$Port/"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/" -or [string]::IsNullOrWhiteSpace($localPath)) {
            $localPath = "/index.html"
        }

        $fullPath = Join-Path $PSScriptRoot $localPath.TrimStart('/')

        if (Test-Path $fullPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            if ($fullPath.EndsWith('.html')) {
                $response.ContentType = 'text/html; charset=utf-8'
            } elseif ($fullPath.EndsWith('.js') -or $fullPath.EndsWith('.jsx')) {
                $response.ContentType = 'application/javascript; charset=utf-8'
            } elseif ($fullPath.EndsWith('.css')) {
                $response.ContentType = 'text/css; charset=utf-8'
            }
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
}
