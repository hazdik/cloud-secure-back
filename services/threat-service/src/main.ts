import { NestFactory } from '@nestjs/core';
import { ThreatModule } from './threat.module';

async function bootstrap() {
  const app = await NestFactory.create(ThreatModule);
  await app.listen(process.env.PORT || 4004);
}
bootstrap();
