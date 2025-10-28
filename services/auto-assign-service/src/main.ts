import { NestFactory } from '@nestjs/core';
import { AutoAssignModule } from './autoAssign.module';

async function bootstrap() {
  const app = await NestFactory.create(AutoAssignModule);
  await app.listen(3001);
}
bootstrap();
