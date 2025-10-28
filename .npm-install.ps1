$folders = @(
    "services/api-gateway",
    "services/auth-service",
    "services/user-service",
    "services/data-service",
    "services/notification-service",
    "shared"
)

foreach ($folder in $folders) {
    Write-Host "Installing dependencies in $folder..."
    Push-Location $folder
    npm install
    Pop-Location
}
Write-Host "All dependencies installed."