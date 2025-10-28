
import { Controller, Post, Body } from '@nestjs/common';
import { MongoClient } from 'mongodb';


export class NotificationRequest {
  channel!: 'slack' | 'email' | 'webhook';
  destination!: string;
  message!: string;
}

export class NotificationResponse {
  status!: 'sent' | 'error';
  message!: string;
}

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGO_DB || 'notificationdb';
const COLLECTION = 'delivery_logs';

@Controller('notification')
export class NotificationController {
  @Post('publish')
  async publish(@Body() req: NotificationRequest): Promise<NotificationResponse> {
    let client: MongoClient | null = null;
    let status: 'sent' | 'error' = 'sent';
    let message = `Notification sent to ${req.channel} at ${req.destination}.`;
    try {
      // Simulate notification publish (replace with real logic)
      // ...existing code...
    } catch (err: any) {
      status = 'error';
      message = err.message || 'Failed to send notification.';
    }
    try {
      client = await MongoClient.connect(MONGO_URL);
      const db = client.db(DB_NAME);
      await db.collection(COLLECTION).insertOne({
        timestamp: new Date().toISOString(),
        status,
        channel: req.channel,
        destination: req.destination,
        message: req.message
      });
    } catch (err) {
      // Log error but do not fail notification
      console.error('Failed to log delivery event:', err);
    } finally {
      if (client) await client.close();
    }
    return { status, message };
  }
}
