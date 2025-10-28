# Incident Auto-Assign Service API Reference

## Base URL
`http://localhost:8000`

---

## Endpoints

### POST `/incident/auto-assign`
Auto-assign incidents using AI engine.
- **Request Body:**
```json
{
  "incident_id": "string",
  "details": { ... }
}
```
- **Response:**
```json
{
  "assigned_to": "user_id",
  "status": "assigned"
}
```
