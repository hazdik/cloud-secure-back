import { Module } from '@nestjs/common';
import { EstateController } from './estate.controller';

@Module({
  controllers: [EstateController],
})
export class EstateModule {}
