import { Module } from '@nestjs/common';
import { TeacherGatewayController } from './teacher.controller';
import { TeacherGatewayService } from './teacher.service';

@Module({
  controllers: [TeacherGatewayController],
  providers: [TeacherGatewayService],
})
export class TeacherGatewayModule {}
