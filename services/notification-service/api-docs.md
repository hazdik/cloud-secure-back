# Notification Service API Reference

## Base URL
`http://localhost:8000`

---

## Endpoints

### POST `/notify/send`
Send a notification to a channel (Slack, Email, Webhook).
- **Request Body:**
```json
{
  "channel": "slack",
  "recipient": "user@example.com",
  "message": "Alert: High severity threat detected."
}
```
- **Response:**
```json
{
  "status": "sent",
  "timestamp": "2025-10-28T12:00:00Z"
}
```

---

### GET `/notify/logs`
Get delivery logs.
- **Response:**
```json
[
  {
    "channel": "slack",
    "recipient": "user@example.com",
    "status": "sent",
    "timestamp": "2025-10-28T12:00:00Z"
  }
]
```
