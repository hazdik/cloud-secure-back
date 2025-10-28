# SLA Alert Service API Reference

## Base URL
`http://localhost:8000`

---

## Endpoints

### POST `/sla/alert`
Trigger SLA alert using Redis TTL.
- **Request Body:**
```json
{
  "ticket_id": "string",
  "expires_in": 3600
}
```
- **Response:**
```json
{
  "status": "alert_triggered"
}
```
