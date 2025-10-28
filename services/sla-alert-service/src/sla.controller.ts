import { Controller, Post, Body } from '@nestjs/common';
import Redis from 'ioredis';



export class SLAAlertRequest {
  ticketId!: string;
  ttlMinutes!: number;
  notifyChannel!: string;
}

export class SLAAlertResponse {
  status!: 'scheduled' | 'error';
  message!: string;
}


const redis = new Redis();

// Listen for Redis key expiration events to trigger notification
redis.config('SET', 'notify-keyspace-events', 'Ex');
redis.subscribe('__keyevent@0__:expired', (err, count) => {
  if (err) console.error('Failed to subscribe to Redis key expiration events:', err);
});

redis.on('message', async (channel, message) => {
  if (channel === '__keyevent@0__:expired' && message.startsWith('sla:')) {
    const ticketId = message.split(':')[1];
    // Call notificationService (pseudo-code)
    // await axios.post(`${process.env.NOTIFICATION_SERVICE_URL}/notify`, { ticketId, type: 'sla_expired' });
    console.log(`SLA expired for ticket ${ticketId}. Notification triggered.`);
  }
});

@Controller('sla')
export class SLAController {
  @Post('schedule')
  async scheduleSLA(@Body() req: SLAAlertRequest): Promise<SLAAlertResponse> {
    try {
      await redis.set(`sla:${req.ticketId}`, 'pending', 'EX', req.ttlMinutes * 60);
      // In real implementation, subscribe to Redis key expiration event to trigger notification
      return {
        status: 'scheduled',
        message: `SLA alert scheduled for ticket ${req.ticketId} in ${req.ttlMinutes} minutes.`,
      };
    } catch (err) {
      return {
        status: 'error',
        message: 'Failed to schedule SLA alert.',
      };
    }
  }
}
