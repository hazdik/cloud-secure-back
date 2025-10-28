import { Module } from '@nestjs/common';
import { ThreatController } from './threat.controller';

@Module({
  controllers: [ThreatController],
})
export class ThreatModule {}
