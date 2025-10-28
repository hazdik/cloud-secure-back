# cloud-secure-back


| Layer                 | Technology                               | Purpose                                                |
| --------------------- | ---------------------------------------- | ------------------------------------------------------ |
| **Frontend**          | React + Next.js + Tailwind               | Interactive dashboards & tree views                    |
| **Backend**           | Node.js (NestJS)                         | API gateway, auth, orchestration                       |
| **AI Engine**         | Python (FastAPI + MLflow + Transformers) | Threat detection, anomaly scoring, workflow automation |
| **Database**          | PostgreSQL + MongoDB                     | Relational data + event storage                        |
| **Queue / Event Bus** | RabbitMQ / Kafka                         | Async alerting and job processing                      |
| **Cache**             | Redis                                    | Low-latency dashboard metrics                          |
| **Infra**             | AWS / GCP / Azure                        | Multi-cloud connectors                                 |
| **Security**          | JWT + HMAC + RBAC                        | Auth & data integrity                                  |
| **Compliance APIs**   | AWS Config, Azure Policy, GCP SCC        | Cloud compliance data                                  |
| **Monitoring**        | Prometheus + Grafana                     | Metrics and alerts                                     |
| **CI/CD**             | GitHub Actions + Terraform + Docker      | Deployment automation                                  |

## Monorepo Setup & Build Architecture

### Project Structure

- `services/` — All backend microservices (NestJS, FastAPI, etc.)
- `shared/` — Common libraries, providers, types, and utilities
- `frontend/` — Frontend dashboard (React/Next.js)
- `helm-chart/` — Kubernetes deployment manifests
- `Dockerfile`, `docker-compose.yml` — Containerization for local/dev/prod
- `tsconfig.json` (root) — Unified TypeScript config for all services/shared

### Setup Instructions

1. **Install Dependencies**
   ```sh
   npm install
   # For Python AI engine:
   cd services/ai-threat-analyzer && pip install -r requirements.txt
   ```

2. **Environment Configuration**
   - Copy `.env.example` to `.env.local` and fill in secrets for each service.
   - Cloud credentials for AWS, Azure, GCP should be set in environment variables or secret stores.

3. **Build All Services**
   ```sh
   npm run build  # Compiles all TypeScript services and shared code
   ```

4. **Run All Services (Dev)**
   ```sh
   npm run start:all  # Use concurrently or custom scripts to start all microservices
   ```

5. **Docker Compose (Local/Dev)**
   ```sh
   docker-compose up --build
   ```

6. **Kubernetes Deployment**
   - Edit values in `helm-chart/values.yaml` for your environment.
   - Deploy with Helm:
     ```sh
     helm install cloud-secure-back ./helm-chart
     ```

7. **CI/CD Pipeline**
   - GitHub Actions workflows automate build, test, lint, Docker image push, and EKS deployment.
   - See `.github/workflows/` for pipeline details.

### Build/Run Scripts
- `npm run build` — Compile all TypeScript code
- `npm run start:all` — Start all backend services
- `docker-compose up` — Local container orchestration
- `helm install` — Kubernetes deployment

### Notes
- All TypeScript services use the root `tsconfig.json` for unified config.
- Shared code is imported directly from `shared/`.
- Logs, metrics, and compliance data are stored in centralized cloud storage (S3, Blob, GCP).
- For troubleshooting, restart your editor/TypeScript server after major config changes.

## AI Threat Analyzer Architecture

- **API Framework:** FastAPI (Python)
- **Queue:** RabbitMQ (configured via Node .env)
- **Database:** MongoDB (configured via Node .env)
- **Cache:** Redis (configured via Node .env)
- **Model:** ML model loaded from path in .env
- **Endpoints:** `/analyze` (POST) — Analyze logs and store anomalies
- **Background:** Consumes logs from RabbitMQ, stores anomalies in MongoDB and Redis
- **Communication:**
  - Receives logs/events from Node microservices via RabbitMQ
  - Stores anomalies in MongoDB and Redis for cross-service access
  - Can publish metrics/alerts to other services via queue or cache
- **Config:** All connection strings and paths are loaded from `.env` for seamless integration with Node.js ecosystem

## AI Threat Analyzer Architecture (with NLP)

### Overview
- **Framework:** FastAPI (Python)
- **Design Pattern:** Prototype pattern for extensible analyzers
- **API:** RESTful endpoints for log analysis, Q&A, anomaly reporting
- **Queue:** RabbitMQ (event ingestion from Node microservices)
- **Database:** MongoDB (anomaly storage)
- **Cache:** Redis (fast anomaly lookup)
- **ML Model:** Scikit-learn, joblib (custom or pre-trained)
- **NLP Dependencies:**
  - `transformers` (HuggingFace) — for advanced question answering and text classification
  - `nltk` — for text preprocessing, tokenization
  - `spacy` — for entity recognition, intent detection
  - `sentence-transformers` — for semantic search and similarity
  - `scikit-learn` — for anomaly detection/classification
  - `joblib` — for model serialization
- **Config:** All connection strings, model paths, and credentials loaded from `.env` (via `python-dotenv`)

### Key Features
- **Log Analysis:**
  - Receives logs/events via RabbitMQ
  - Extracts features and scores anomalies using ML model
  - Stores anomalies in MongoDB and Redis
- **NLP Q&A Bot:**
  - `/ask` endpoint uses NLP models to answer security/compliance questions
  - Can use HuggingFace transformers for contextual answers
  - Extensible knowledge base for cloud, security, compliance topics
- **Remediation & Solution Engine:**
  - Maps detected anomalies to recommended actions
  - Can trigger automated remediation workflows via API or queue
- **Reporting:**
  - `/anomalies/report` endpoint provides detailed anomaly reports with severity and remedies
  - Supports CSV/PDF export for audit/compliance
- **Extensibility:**
  - Prototype pattern allows easy addition of new analyzers (e.g., for new log types or ML models)
  - NLP pipeline can be extended for chatbots, semantic search, entity extraction

### Example Dependencies (add to `requirements.txt`)
```
fastapi
uvicorn
pika
pymongo
joblib
python-dotenv
transformers
nltk
spacy
sentence-transformers
scikit-learn
redis
```

### Communication
- Node.js microservices send logs/events to RabbitMQ
- AI Threat Analyzer consumes, analyzes, and stores results
- Other services can query anomalies, ask questions, or trigger remediation via REST API

---
