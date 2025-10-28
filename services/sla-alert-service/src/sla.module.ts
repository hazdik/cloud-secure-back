import { Module } from '@nestjs/common';
import { SLAController } from './sla.controller';

@Module({
  controllers: [SLAController],
})
export class SLAModule {}
