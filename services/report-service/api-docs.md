# Report Service API Reference

## Base URL
`http://localhost:8000`

---

## Endpoints

### GET `/reports/export`
Export dynamic reports and return download URL.
- **Response:**
```json
{
  "url": "https://s3.amazonaws.com/bucket/report.csv"
}
```
