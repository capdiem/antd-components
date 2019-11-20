if ((Test-Path "lib")) {
  Remove-Item lib -r -force
  Write-Host "Removed \lib folder successfully!" -ForegroundColor Green
}

npm publish