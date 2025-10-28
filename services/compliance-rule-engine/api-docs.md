# Compliance Rule Engine API Reference

## Base URL
`http://localhost:8000`

---

## Endpoints

### POST `/compliance/evaluate`
Evaluate compliance rules for a resource.
- **Request Body:**
```json
{
  "resource_id": "string",
  "rules": ["rule1", "rule2"]
}
```
- **Response:**
```json
{
  "result": "compliant",
  "remediation": "Auto-remediation triggered."
}
```

---

### GET `/compliance/report`
Get compliance report.
- **Response:**
```json
{
  "report": [ ... ]
}
```
