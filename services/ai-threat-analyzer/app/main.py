from fastapi import FastAPI
from app.api.v1 import threat, report, ask

app = FastAPI()

app.include_router(threat.router)
app.include_router(report.router)
app.include_router(ask.router)
