import { NestFactory } from '@nestjs/core';
import { IncidentAssignModule } from './incidentAssign.module';

async function bootstrap() {
  const app = await NestFactory.create(IncidentAssignModule);
  await app.listen(3005);
}
bootstrap();
