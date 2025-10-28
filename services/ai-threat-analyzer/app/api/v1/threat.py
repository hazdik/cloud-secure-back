from fastapi import APIRouter, Request
from app.services.analyzer import analyzer
from app.core.db import anomalies_collection, redis_client
import json

router = APIRouter()

@router.post('/analyze')
async def analyze_log(request: Request):
    log = await request.json()
    anomaly_score = analyzer.analyze(log)
    if anomaly_score > 0.8:
        anomaly = {
            'log': log,
            'score': anomaly_score
        }
        anomalies_collection.insert_one(anomaly)
        redis_client.set(f"anomaly:{log.get('id', '')}", json.dumps(anomaly))
    return {'anomaly_score': anomaly_score}
