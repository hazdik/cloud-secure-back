import { NestFactory } from '@nestjs/core';
import { CostModule } from './cost.module';

async function bootstrap() {
  const app = await NestFactory.create(CostModule);
  await app.listen(3002);
}
bootstrap();
