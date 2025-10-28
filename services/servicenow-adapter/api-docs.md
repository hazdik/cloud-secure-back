# ServiceNow Adapter API Reference

## Base URL
`http://localhost:8000`

---

## Endpoints

### POST `/servicenow/sync`
Sync tickets and status with ServiceNow.
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
