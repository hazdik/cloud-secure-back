import { NestFactory } from '@nestjs/core';
import { EstateModule } from './estate.module';

async function bootstrap() {
  const app = await NestFactory.create(EstateModule);
  await app.listen(3008);
}
bootstrap();
