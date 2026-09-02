$root='C:\Users\대운\Desktop\my website\gladm3098'
$files=@('index.html','consult.html','services.html','cases.html','food.html','meat.html','haccp.html','license.html')
$pattern='href\s*=\s*"([^"]+)"'
$missing=@()
foreach($f in $files){
  $path=Join-Path $root $f
  if(-not (Test-Path $path)){ Write-Output "MISSING FILE: $f"; continue }
  $text=Get-Content -Raw -Encoding UTF8 $path
  $matches=[regex]::Matches($text,$pattern)
  foreach($m in $matches){
    $href=$m.Groups[1].Value
    if($href -match '^(http:|https:|mailto:|tel:|#|javascript:)'){ continue }
    $hrefClean = ($href -split '[#?]')[0]
    if($hrefClean -like 'data:*'){ continue }
    if($hrefClean.StartsWith('/')){ $p=Join-Path $root $hrefClean.TrimStart('/') }
    else { $p = Resolve-Path -ErrorAction SilentlyContinue (Join-Path (Split-Path $path -Parent) $hrefClean) }
    if(-not $p){ $missing += "${f} -> ${href}" }
  }
}
if($missing.Count -eq 0){ Write-Output "No missing relative links found." } else { Write-Output "Missing links:"; $missing | ForEach-Object { Write-Output $_ } }
