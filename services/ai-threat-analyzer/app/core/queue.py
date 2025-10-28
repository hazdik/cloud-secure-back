import pika
from app.core.config import RABBITMQ_URL, QUEUE_NAME

connection = pika.BlockingConnection(pika.URLParameters(RABBITMQ_URL))
channel = connection.channel()
channel.queue_declare(queue=QUEUE_NAME)
