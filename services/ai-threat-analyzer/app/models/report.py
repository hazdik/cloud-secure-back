from pydantic import BaseModel
from typing import Any

class AnomalyReport(BaseModel):
    log: Any
    score: float
    severity: str
    remedy: str
