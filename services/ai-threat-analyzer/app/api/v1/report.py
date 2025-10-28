from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.core.db import anomalies_collection
from app.services.remedy import REMEDIES

router = APIRouter()

@router.get('/anomalies/report')
def anomaly_report():
    anomalies = list(anomalies_collection.find())
    report = []
    for anomaly in anomalies:
        log = anomaly.get('log', {})
        score = anomaly.get('score', 0)
        severity = 'HIGH' if score > 0.9 else 'MEDIUM' if score > 0.8 else 'LOW'
        remedy = REMEDIES[severity]
        report.append({
            'log': log,
            'score': score,
            'severity': severity,
            'remedy': remedy
        })
    return JSONResponse(content={'anomaly_report': report})
