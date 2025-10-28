import threading
import json
from app.core.queue import channel, QUEUE_NAME
from app.services.analyzer import analyzer
from app.core.db import anomalies_collection, redis_client

def process_log(ch, method, properties, body):
    log = json.loads(body)
    anomaly_score = analyzer.analyze(log)
    if anomaly_score > 0.8:
        anomaly = {
            'log': log,
            'score': anomaly_score
        }
        anomalies_collection.insert_one(anomaly)
        redis_client.set(f"anomaly:{log.get('id', '')}", json.dumps(anomaly))
    ch.basic_ack(delivery_tag=method.delivery_tag)

def start_consumer():
    channel.basic_consume(queue=QUEUE_NAME, on_message_callback=process_log)
    print('AI Threat Analyzer queue consumer running...')
    channel.start_consuming()

threading.Thread(target=start_consumer, daemon=True).start()
