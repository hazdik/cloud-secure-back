import { NestFactory } from '@nestjs/core';
import { SLAModule } from './sla.module';

async function bootstrap() {
  const app = await NestFactory.create(SLAModule);
  await app.listen(3007);
}
bootstrap();
