import { Module } from '@nestjs/common';
import { TimetableGatewayController } from './timetable.controller';
import { TimetableGatewayService } from './timetable.service';

@Module({
  controllers: [TimetableGatewayController],
  providers: [TimetableGatewayService],
})
export class TimetableGatewayModule {}
