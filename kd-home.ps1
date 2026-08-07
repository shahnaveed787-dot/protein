$path = 'C:\laragon\www\protein\index.html'
$html = [IO.File]::ReadAllText($path)
$lines = $html -split "`r?`n"

Write-Output '=== Occurrences in source (line by line) ==='
$n = 0
for ($i = 0; $i -lt $lines.Count; $i++) {
  $line = $lines[$i]
  foreach ($m in [regex]::Matches($line, '(?i)owyn protein shakes?')) {
    $n++
    $ctx = $line.Trim()
    if ($ctx.Length -gt 120) { $ctx = $ctx.Substring(0, 120) + '...' }
    Write-Output ("$n. L$($i+1) [$($m.Value)] $ctx")
  }
}
Write-Output ''
Write-Output "Total substring hits in HTML source: $n"

# Visible text only (no tags), each hit numbered
$t = $html
$t = [regex]::Replace($t, '(?is)<script[^>]*>.*?</script>', ' ')
$t = [regex]::Replace($t, '(?is)<style[^>]*>.*?</style>', ' ')
$t = [regex]::Replace($t, '(?is)<[^>]+>', ' ')
$t = [System.Net.WebUtility]::HtmlDecode($t)
$t = [regex]::Replace($t, '\s+', ' ').Trim()
Write-Output ''
Write-Output '=== Visible text hits ==='
$n2 = 0
foreach ($m in [regex]::Matches($t, '(?i)owyn protein shakes?')) {
  $n2++
  $start = [Math]::Max(0, $m.Index - 35)
  $len = [Math]::Min(90, $t.Length - $start)
  $snip = $t.Substring($start, $len).Trim()
  Write-Output ("$n2. [$($m.Value)] ...$snip...")
}
Write-Output "Visible text total: $n2"
