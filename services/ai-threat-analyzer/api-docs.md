# AI Threat Analyzer API Reference

## Base URL
`http://localhost:8000`

---

## Endpoints

### POST `/analyze`
Analyze a cloud log for anomalies using the ML model.
- **Request Body:**
```json
{
  "id": "string",
  "event_score": 0.85
}
```
- **Response:**
```json
{
  "anomaly_score": 0.92
}
```

---

### GET `/prototype`
Get info about the analyzer prototype and model type.
- **Response:**
```json
{
  "prototype": "ThreatAnalyzer",
  "model": "<class 'sklearn...'>"
}
```

---

### POST `/ask`
Ask a cloud security question. Returns best-practice remediation if matched.
- **Request Body:**
```json
{
  "question": "How to secure s3 bucket?"
}
```
- **Response:**
```json
{
  "answer": "Restrict bucket access using AWS IAM policies and bucket ACLs."
}
```

---

### GET `/anomalies/report`
Get a report of detected anomalies, severity, and recommended remedies.
- **Response:**
```json
{
  "anomaly_report": [
    {
      "log": { ... },
      "score": 0.92,
      "severity": "HIGH",
      "remedy": "Immediate remediation required. Follow cloud provider best practices."
    }
  ]
}
```

---

## Error Codes
- `400 Bad Request`: Invalid input
- `500 Internal Server Error`: Unexpected error

---

## Usage
- Start service: `uvicorn main:app --reload`
- Interactive docs: [Swagger UI](http://localhost:8000/docs)
