$folders = @(
    "services/api-gateway",
    "services/audit-service",
    "services/auth-service",
    "services/auto-assign-service",
    "services/compliance-service",
    "services/cost-jobs",
    "services/cost-service",
    "services/data-service",
    "services/estate-service",
    "services/incident-auto-assign-service",
    "services/metrics-service",
    "services/notification-service",
    "services/report-service",
    "services/sla-alert-service",
    "services/threat-service",
    "services/ticket-sync-service",
    "services/user-service",
    "services/vulnerability-service",
    "shared"
)

foreach ($folder in $folders) {
    Write-Host "Installing dependencies in $folder..."
    Push-Location $folder
    npm install
    Pop-Location
}
Write-Host "All dependencies installed."