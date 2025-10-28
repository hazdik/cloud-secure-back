# Auto-Assign Service API Reference

## Base URL
`http://localhost:8000`

---

## Endpoints

### POST `/auto-assign/threat`
Auto-assign high-severity threats to team leads.
- **Request Body:**
```json
{
  "threat_id": "string",
  "severity": "HIGH"
}
```
- **Response:**
```json
{
  "assigned_to": "team_lead_id",
  "status": "assigned"
}
```
