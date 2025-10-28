from fastapi import APIRouter
from app.services.analyzer import model

router = APIRouter()

@router.get('/prototype')
def get_prototype():
    return {'prototype': 'ThreatAnalyzer', 'model': str(type(model))}
