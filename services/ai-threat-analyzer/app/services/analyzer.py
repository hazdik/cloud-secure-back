import joblib
from app.core.config import MODEL_PATH

class ThreatAnalyzerPrototype:
    def clone(self):
        return ThreatAnalyzer(self.model)

class ThreatAnalyzer:
    def __init__(self, model):
        self.model = model
    def analyze(self, log):
        features = [log.get('event_score', 0)]
        anomaly_score = self.model.predict([features])[0]
        return anomaly_score

model = joblib.load(MODEL_PATH)
prototype = ThreatAnalyzerPrototype()
prototype.model = model
analyzer = prototype.clone()
