$ErrorActionPreference = "Stop"
$projectRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$environmentPath = Join-Path $projectRoot ".local/voice-env"
$modelPath = Join-Path $projectRoot ".local/voice-model"
$pythonPath = Join-Path $environmentPath "Scripts/python.exe"

if (-not (Test-Path -LiteralPath $pythonPath)) {
  py -3.11 -m venv $environmentPath
  if ($LASTEXITCODE -ne 0) { throw "Python 3.11 is required to create the local voice environment." }
}
& $pythonPath -m pip install -r (Join-Path $PSScriptRoot "requirements-voice.txt")
if ($LASTEXITCODE -ne 0) { throw "Unable to install local voice dependencies." }

New-Item -ItemType Directory -Force -Path $modelPath | Out-Null
$release = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.1"
$files = @(
  @{ Name = "kokoro-v1.0.onnx"; Hash = "BEB0D1848DEE9A49DA392CC3DF26958D46CFA35D321EDF434F52949153F0DF3A" },
  @{ Name = "voices-v1.0.bin"; Hash = "BCA610B8308E8D99F32E6FE4197E7EC01679264EFED0CAC9140FE9C29F1FBF7D" }
)
foreach ($file in $files) {
  $target = Join-Path $modelPath $file.Name
  if (-not (Test-Path -LiteralPath $target)) {
    Invoke-WebRequest -Uri ($release + "/" + $file.Name) -OutFile $target -UseBasicParsing
  }
  if ((Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash -ne $file.Hash) {
    throw ("Model checksum mismatch: " + $file.Name + ". Inspect the file before regenerating narration.")
  }
}
Write-Output "Neural voice setup complete. Generation now runs locally without a voice service."
