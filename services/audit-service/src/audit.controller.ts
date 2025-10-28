
import { Controller, Post, Body } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';


export class AuditLogRequest {
  eventType!: string;
  userId!: string;
  details!: any;
}

export class AuditLogResponse {
  logId!: string;
  status!: 'logged' | 'error';
  message!: string;
}

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGO_DB || 'auditdb';
const COLLECTION = 'audit_logs';

@Controller('audit')
export class AuditController {
  @Post('log')
  async logEvent(@Body() req: AuditLogRequest): Promise<AuditLogResponse> {
    let client: MongoClient | null = null;
    try {
      client = await MongoClient.connect(MONGO_URL);
      const db = client.db(DB_NAME);
      const result = await db.collection(COLLECTION).insertOne({
        eventType: req.eventType,
        userId: req.userId,
        details: req.details,
        timestamp: new Date(),
        immutable: true
      });
      return {
        logId: result.insertedId.toString(),
        status: 'logged',
        message: 'Event logged successfully.'
      };
    } catch (err: any) {
      return {
        logId: '',
        status: 'error',
        message: err.message || 'Failed to log event.'
      };
    } finally {
      if (client) await client.close();
    }
  }
}
