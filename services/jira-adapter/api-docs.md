# Jira Adapter API Reference

## Base URL
`http://localhost:8000`

---

## Endpoints

### POST `/jira/sync`
Sync tickets and status with Jira.
- **Request Body:**
```json
{
  "ticket_id": "string",
  "status": "OPEN|CLOSED"
}
```
- **Response:**
```json
{
  "status": "synced"
}
```
