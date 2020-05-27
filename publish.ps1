<#
.SYNOPSIS
.PARAMETER tag
.PARAMETER version
.PARAMETER prodBranch
#>
[CmdletBinding()]
param (
  [Parameter(Mandatory = $true, Position = 0, HelpMessageBaseName = 'Please input npm publish tag')]
  [ValidateSet('latest', 'alpha', 'beta')]
  [string]
  $tag = 'latest',
  [Parameter(Mandatory = $true, Position = 1, HelpMessage = 'version can not be $null')]
  [ValidateSet('major', 'minor', 'patch', 'incr.', 'custom')]
  [string]
  $version,
  [Parameter(Position = 2)]
  [string]
  $prodBranch = 'master'
)

# step 1: branch and tag validation
Write-Host 'Validating...' -ForegroundColor Yellow
[string]$currentBranchString = git.ps1 branch --list | Select-String "^\*"
[string]$currentBranch = $currentBranchString.Remove(0, 2)

if (($currentBranch -eq $prodBranch) -and ($tag -ne 'latest')) {
  Write-Host "The branch is $currentBranch (a production branch) but your input tag is $tag, it is not recommend to publish a development package from production branch." -ForegroundColor Red
  return
}
elseif (($currentBranch -ne $prodBranch) -and ($tag -eq 'latest')) {
  Write-Host "The branch is $currentBranch (a development branch) but your input tag is $tag, it is not recommend to publish a production package from development branch." -ForegroundColor Red
  return
}

if ($version -eq 'custom') {
  Write-Host "Please input custom version:" -ForegroundColor Blue
  $newVersion = Read-Host
}
else {
  # step 2: select version if tag is latest or tag version not exists
  if ($tag -ne 'latest') {
    # development version: <latest version>-{$version}.<number>

    $majorOption = New-Object System.Management.Automation.Host.ChoiceDescription "&z:主版本号", "MAJOR version: 当你做了不兼容的 API 修改"
    $minorOption = New-Object System.Management.Automation.Host.ChoiceDescription "&c:次版本号", "MINOR version: 当你做了向下兼容的功能性新增"
    $patchOption = New-Object System.Management.Automation.Host.ChoiceDescription "&x:修订号", "PATCH version: 当你做了向下兼容的问题修正"
    $incrOption = New-Object System.Management.Automation.Host.ChoiceDescription "&i:测试增量", "Increment only for alpha, beta or next tag"

    $options = [System.Management.Automation.Host.ChoiceDescription[]](
      $majorOption,
      $minorOption,
      $patchOption,
      $incrOption
    )

    $selectedChoice = $Host.UI.PromptForChoice("Select update way", "请选择此版本的改动程度，选择后会在上个版本号对应的节点加一：`r`n主版本号：当你做了不兼容的 API 修改`r`n次版本号：当你做了向下兼容的功能性新增`r`n修订号：当你做了向下兼容的问题修正`r`n测试增量：测试版本号加一", $options, 2)

    [string]$currentVersionString = npm.cmd dist-tag ls "@capdiem/antd-components" | Select-String "$tag`:"

    if ($selectedChoice -eq 3) {
      if ($null -eq $currentVersionString) {
        Write-Host "None of versions with tag $tag exists, please select major/minor/patch first." -ForegroundColor Red
        return
      }

      [string]$currentVersion = $currentVersionString.Remove(0, $tag.Length + 2)
      $splits = $currentVersion.Split("-$tag.")
      [int]$incr = $splits[1]
      $newVersion = "$($splits[0])-$tag.$($incr+1)"
    }
    else {
      [string]$latestVersionString = npm.cmd dist-tag ls "@capdiem/antd-components" | Select-String latest
      [string]$latestVersion = $latestVersionString.Remove(0, 'latest'.Length + 2)
      [int[]]$latestVersions = $latestVersion.Split('.')
      [int]$major = $latestVersions[0]
      [int]$minor = $latestVersions[1]
      [int]$patch = $latestVersions[2]

      switch ($selectedChoice) {
        0 { $newVersion = "$($major+1).0.0-$tag.0" }
        1 { $newVersion = "$major.$($minor+1).0-$tag.0" }
        Default { $newVersion = "$major.$minor.$($patch+1)-$tag.0" }
      }
    }
  }
  elseif ($version -eq 'incr.') {
    Write-Host "Please select major/minor/patch for the tag is latest." -ForegroundColor Red
    return
  }
}

if ($null -eq $newVersion) {
  $newVersion = $version
}

Write-Host "New version is $newVersion, and the command 'npm publish --tag $tag' will go to run, please confirm:`r`nInput Y(yes) to confirm or input N(no) to exit. Default Y(yes)." -ForegroundColor Green
$confirm = Read-Host

if (("NO", "N").Contains($confirm.ToUpper())) {
  return
}

try {
  git.ps1 stash

  npm.cmd version $newVersion

  # catch error and stop if exits
  if (-not $?) { throw }

  if (Get-Command nrm -ErrorAction SilentlyContinue) {
    nrm.cmd use npm
  }

  if ((Test-Path "lib")) {
    Remove-Item lib -r -force
    Write-Host "Removed \lib folder successfully!" -ForegroundColor Green
  }

  npm publish --tag $tag

  # catch error and stop if exits
  if (-not $?) { throw }

  git.ps1 push
}
catch {
  Write-Error 'Something goes wrong'
}
finally {
  if (Get-Command nrm -ErrorAction SilentlyContinue) {
    nrm.cmd use taobao
  }

  git.ps1 stash pop
}




