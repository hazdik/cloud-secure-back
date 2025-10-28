# Sync Jobs Service API Reference

## Base URL
`http://localhost:8000`

---

## Endpoints

### POST `/sync/run`
Run background sync job for cloud resources.
- **Request Body:**
```json
{
  "provider": "aws|azure|gcp"
}
```
- **Response:**
```json
{
  "status": "started"
}
```
