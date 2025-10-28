import { Module } from '@nestjs/common';
import { AutoAssignController } from './autoAssign.controller';

@Module({
  controllers: [AutoAssignController],
})
export class AutoAssignModule {}
