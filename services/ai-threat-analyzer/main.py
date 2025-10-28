import pika
import pymongo
import joblib
import json

# RabbitMQ setup
rabbitmq_url = 'amqp://guest:guest@localhost:5672/'
connection = pika.BlockingConnection(pika.URLParameters(rabbitmq_url))
channel = connection.channel()
channel.queue_declare(queue='cloud-logs')

# MongoDB setup
mongo_client = pymongo.MongoClient('mongodb://localhost:27017/')
db = mongo_client['threats']
anomalies_collection = db['anomalies']

# Load ML model (placeholder)
model = joblib.load('model.pkl')

def process_log(ch, method, properties, body):
    log = json.loads(body)
    # Feature extraction (placeholder)
    features = [log.get('event_score', 0)]
    anomaly_score = model.predict([features])[0]
    if anomaly_score > 0.8:
        anomaly = {
            'log': log,
            'score': anomaly_score
        }
        anomalies_collection.insert_one(anomaly)
        # Publish summary to metricsService (placeholder)
        print('Anomaly detected:', anomaly)
    ch.basic_ack(delivery_tag=method.delivery_tag)

channel.basic_consume(queue='cloud-logs', on_message_callback=process_log)
print('AI Threat Analyzer running...')
channel.start_consuming()
