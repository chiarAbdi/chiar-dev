param(
  [string]$OutputDirectory = ".local/ict-video/audio"
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$storyboardPath = Join-Path $projectRoot "src/lib/ict-introduction.json"
$storyboard = Get-Content -Raw -LiteralPath $storyboardPath | ConvertFrom-Json
$audioDirectory = Join-Path $projectRoot $OutputDirectory
New-Item -ItemType Directory -Force -Path $audioDirectory | Out-Null

Add-Type -AssemblyName System.Speech
$speaker = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
  $speaker.SelectVoice("Microsoft Hazel Desktop")
  $speaker.Rate = 2
  $speaker.Volume = 100
  foreach ($scene in $storyboard.scenes) {
    $audioPath = Join-Path $audioDirectory ($scene.id + ".wav")
    $speaker.SetOutputToWaveFile($audioPath)
    $speaker.Speak($scene.narration)
    $speaker.SetOutputToNull()
    Write-Output ("Narrated " + $scene.id)
  }
} finally {
  $speaker.Dispose()
}
