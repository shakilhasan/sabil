import { Module } from '@nestjs/common';
import { SemesterGatewayController } from './semester.controller';
import { SemesterGatewayService } from './semester.service';

@Module({
  controllers: [SemesterGatewayController],
  providers: [SemesterGatewayService],
})
export class SemesterGatewayModule {}
