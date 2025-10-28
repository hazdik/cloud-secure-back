# Audit Service API Reference

## Base URL
`http://localhost:8000`

---

## Endpoints

### POST `/audit/log`
Log a CRUD or system event.
- **Request Body:**
```json
{
  "event_type": "CREATE",
  "user_id": "string",
  "resource": "string",
  "details": { ... }
}
```
- **Response:**
```json
{
  "status": "success",
  "id": "string"
}
```

---

### GET `/audit/events`
Get a list of audit events.
- **Response:**
```json
[
  {
    "event_type": "CREATE",
    "user_id": "string",
    "resource": "string",
    "details": { ... },
    "timestamp": "2025-10-28T12:00:00Z"
  }
]
```
