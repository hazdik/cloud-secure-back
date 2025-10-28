
import { NestFactory } from '@nestjs/core';
import { ComplianceModule } from './compliance.module';
import '../src/compliance.cron'; // Ensure cron job runs on service startup

async function bootstrap() {
  const app = await NestFactory.create(ComplianceModule);
  await app.listen(process.env.PORT || 4003);
}
bootstrap();
