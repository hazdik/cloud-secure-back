import { Controller, Post, Body } from '@nestjs/common';

interface SecurityEventRequest {
  eventType: string;
  payload: Record<string, any>;
}

interface ThreatResponse {
  id: string;
  severity: string;
  anomalyScore: number;
  createdAt: string;
}

@Controller('threat')
export class ThreatController {
  @Post('process')
  async processEvent(@Body() req: SecurityEventRequest): Promise<ThreatResponse> {
    // TODO: Run anomaly detection, classify severity, create DB record
    return {
      id: 'threat-123',
      severity: 'HIGH',
      anomalyScore: 0.92,
      createdAt: new Date().toISOString()
    };
  }
}
