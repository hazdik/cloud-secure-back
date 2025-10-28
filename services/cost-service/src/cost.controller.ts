import { Controller, Post, Body } from '@nestjs/common';

export class CostOptimizeRequest {
  resources!: Array<{ type: string; usage: number; }>;
}

export class CostOptimizeResponse {
  predictedCost!: number;
  savings!: number;
  recommendations!: string[];
}

@Controller('cost')
export class CostController {
  @Post('optimize')
  async optimize(@Body() req: CostOptimizeRequest): Promise<CostOptimizeResponse> {
    // Dummy ML logic for cost prediction
    const totalUsage = req.resources.reduce((sum, r) => sum + r.usage, 0);
    const predictedCost = totalUsage * 0.25;
    const savings = totalUsage * 0.05;
    return {
      predictedCost,
      savings,
      recommendations: ['Reduce usage on high-cost resources'],
    };
  }
}
