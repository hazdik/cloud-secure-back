from pydantic import BaseModel

class ThreatLog(BaseModel):
    id: str
    event_score: float
    # Add other relevant fields as needed
