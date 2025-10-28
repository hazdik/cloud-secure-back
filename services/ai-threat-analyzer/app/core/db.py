import pymongo
import redis
from app.core.config import MONGO_URL, REDIS_URL

mongo_client = pymongo.MongoClient(MONGO_URL)
db = mongo_client['threats']
anomalies_collection = db['anomalies']

redis_client = redis.Redis.from_url(REDIS_URL)
