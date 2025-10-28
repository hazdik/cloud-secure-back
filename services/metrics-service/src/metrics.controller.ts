import { Controller, Get } from '@nestjs/common';

@Controller('metrics')
export class MetricsController {
  @Get('overview')
  async getOverview(): Promise<{ compliance: number; securityScore: number; openThreats: number; monthlySavings: number }> {
    // TODO: Aggregate data from threatService, complianceService, costService
    return {
      compliance: 98,
      securityScore: 92,
      openThreats: 3,
      monthlySavings: 1200
    };
  }
}
