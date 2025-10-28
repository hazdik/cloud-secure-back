import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './sync.cron'; // Ensure sync job runs on service startup

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 4007);
}
bootstrap();
