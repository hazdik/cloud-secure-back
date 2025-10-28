import { Module } from '@nestjs/common';
import { CostController } from './cost.controller';

@Module({
  controllers: [CostController],
})
export class CostModule {}
