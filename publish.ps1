[CmdletBinding()]
param (
  [Parameter(Mandatory = $true, Position = 0, HelpMessage = 'version can not be $null')]
  [ValidateSet('major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch')]
  [string]
  $version,
  [Parameter(Position = 1)]
  [ValidateSet('stable', 'beta', 'dev', 'canary')]
  [string]
  $tag = 'stable'
)

git.ps1 stash

npm.cmd version $version

if ($version.StartsWith('pre') -and $tag -eq 'stable') {
  Write-Host "The tag should be set 'beta' because of version($version) starting with 'pre', do you agree?`r`n~ ENTER Y(yes), tag will set to 'beta', or ENTER N(no) do nothing. Default set Y(yes)." -ForegroundColor Green
  $confirm = Read-Host

  if (($confirm -eq '') -or ("YES", "Y").Contains($confirm.ToUpper())) {
    $tag = 'beta'
  }
  elseif (!("NO", "N").Contains($confirm.ToUpper())) {
    Write-Host "Sorry, can not recognize the input '$confirm', the script EXITs!" -ForegroundColor Red
    return
  }
}

if (Get-Command nrm -ErrorAction SilentlyContinue) {
  nrm.cmd use npm
}

if ((Test-Path "lib")) {
  Remove-Item lib -r -force
  Write-Host "Removed \lib folder successfully!" -ForegroundColor Green
}

npm publish --tag $tag

git.ps1 push

if (Get-Command nrm -ErrorAction SilentlyContinue) {
  nrm.cmd use taobao
}

git.ps1 stash pop