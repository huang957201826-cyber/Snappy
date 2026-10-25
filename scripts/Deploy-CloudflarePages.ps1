param(
    [Parameter(Mandatory = $true)]
    [string]$ArtifactDir,

    [string]$ProjectName = 'snappy-download',

    [switch]$KeepLogin
)

$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path -Parent $PSScriptRoot
$manifestPath = Join-Path $ArtifactDir 'artifact-manifest.json'
$wranglerVersion = '4.152.0'

if (-not (Test-Path -LiteralPath $manifestPath)) {
    throw "Canonical manifest not found: $manifestPath"
}

$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
$version = "v$($manifest.version)"
$requiredFiles = @(
    $manifest.setupFileName,
    $manifest.portableFileName,
    'SHA256SUMS.txt',
    'artifact-manifest.json'
)

foreach ($fileName in $requiredFiles) {
    $filePath = Join-Path $ArtifactDir $fileName
    if (-not (Test-Path -LiteralPath $filePath)) {
        throw "Required artifact not found: $filePath"
    }
}

$setupHash = (Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $ArtifactDir $manifest.setupFileName)).Hash
$portableHash = (Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $ArtifactDir $manifest.portableFileName)).Hash

if ($setupHash -ne $manifest.setupSha256) {
    throw 'Setup SHA-256 does not match artifact-manifest.json'
}

if ($portableHash -ne $manifest.portableSha256) {
    throw 'Portable SHA-256 does not match artifact-manifest.json'
}

Push-Location $siteRoot
try {
    $env:VITE_BASE_PATH = '/'

    & npm.cmd ci --prefer-offline --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { throw 'npm ci failed' }

    & npm.cmd run lint
    if ($LASTEXITCODE -ne 0) { throw 'TypeScript check failed' }

    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) { throw 'Vite build failed' }

    $downloadDir = Join-Path $siteRoot "dist\downloads\$version"
    New-Item -ItemType Directory -Force -Path $downloadDir | Out-Null

    foreach ($fileName in $requiredFiles) {
        Copy-Item -LiteralPath (Join-Path $ArtifactDir $fileName) -Destination (Join-Path $downloadDir $fileName) -Force
    }

    $whoamiOutput = (& npx.cmd --yes "wrangler@$wranglerVersion" whoami 2>&1 | Out-String)
    if ($LASTEXITCODE -ne 0 -or $whoamiOutput -match 'not authenticated') {
        & npx.cmd --yes "wrangler@$wranglerVersion" login --scopes pages:write --scopes account:read --scopes user:read
        if ($LASTEXITCODE -ne 0) { throw 'Wrangler login failed' }
    }

    & npx.cmd --yes "wrangler@$wranglerVersion" pages deploy dist --project-name $ProjectName --branch main --commit-dirty=true
    if ($LASTEXITCODE -ne 0) { throw 'Cloudflare Pages deployment failed' }
}
finally {
    if (-not $KeepLogin) {
        & npx.cmd --yes "wrangler@$wranglerVersion" logout | Out-Null
    }

    Remove-Item Env:VITE_BASE_PATH -ErrorAction SilentlyContinue
    Pop-Location
}
