import { Module } from '@nestjs/common';
import { IncidentAssignController } from './incidentAssign.controller';

@Module({
  controllers: [IncidentAssignController],
})
export class IncidentAssignModule {}
