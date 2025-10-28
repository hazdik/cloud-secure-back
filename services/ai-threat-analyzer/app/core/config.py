import os
from dotenv import load_dotenv
load_dotenv()

RABBITMQ_URL = os.getenv('RABBITMQ_URL', 'amqp://guest:guest@localhost:5672/')
MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017/')
REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
QUEUE_NAME = os.getenv('QUEUE_NAME', 'cloud-logs')
MODEL_PATH = os.getenv('MODEL_PATH', 'model.pkl')
