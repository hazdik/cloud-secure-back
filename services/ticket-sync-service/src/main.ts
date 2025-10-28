import { NestFactory } from '@nestjs/core';
import { TicketSyncModule } from './ticketSync.module';

async function bootstrap() {
  const app = await NestFactory.create(TicketSyncModule);
  await app.listen(3006);
}
bootstrap();
