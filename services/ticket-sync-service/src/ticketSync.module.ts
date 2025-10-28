import { Module } from '@nestjs/common';
import { TicketSyncController } from './ticketSync.controller';

@Module({
  controllers: [TicketSyncController],
})
export class TicketSyncModule {}
