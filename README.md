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

---
