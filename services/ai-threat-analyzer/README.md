# AI Threat Analyzer API Documentation

## Overview
The AI Threat Analyzer is a FastAPI-based microservice for cloud security log analysis, anomaly detection, and automated remediation recommendations. It integrates with RabbitMQ, MongoDB, Redis, and supports extensible NLP and ML logic.

---

## Base URL
```
http://localhost:8000
```

---

## Endpoints

### 1. Analyze Threat Log
**POST** `/analyze`
- **Description:** Analyze a cloud log for anomalies using ML model.
- **Request Body:**
```json
{
  "id": "string",
  "event_score": 0.85,
  // ...other log fields
}
```
- **Response:**
```json
{
  "anomaly_score": 0.92
}
```

---

### 2. Prototype Info
**GET** `/prototype`
- **Description:** Get info about the analyzer prototype and model type.
- **Response:**
```json
{
  "prototype": "ThreatAnalyzer",
  "model": "<class 'sklearn...'>"
}
```

---

### 3. Ask Knowledge Base
**POST** `/ask`
- **Description:** Ask a cloud security question. Returns best-practice remediation if matched.
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

### 4. Anomaly Report
**GET** `/anomalies/report`
- **Description:** Get a report of detected anomalies, severity, and recommended remedies.
- **Response:**
```json
{
  "anomaly_report": [
    {
      "log": { ... },
      "score": 0.92,
      "severity": "HIGH",
      "remedy": "Immediate remediation required. Follow cloud provider best practices."
    },
    // ...more anomalies
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
- API docs: [Swagger UI](http://localhost:8000/docs)

---

## Contact
For support, contact the backend team.
