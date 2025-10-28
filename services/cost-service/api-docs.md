# Cost Service API Reference

## Base URL
`http://localhost:8000`

---

## Endpoints

### POST `/cost/optimize`
Run ML cost optimization for resources.
- **Request Body:**
```json
{
  "resource_id": "string",
  "usage": 123.45
}
```
- **Response:**
```json
{
  "predicted_savings": 42.0
}
```

---

### GET `/cost/report`
Get weekly cost report.
- **Response:**
```json
{
  "report_url": "https://s3.amazonaws.com/bucket/report.pdf"
}
```
