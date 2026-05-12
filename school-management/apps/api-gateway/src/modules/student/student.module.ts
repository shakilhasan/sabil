import { Module } from '@nestjs/common';
import { StudentGatewayController } from './student.controller';
import { StudentGatewayService } from './student.service';

@Module({
  controllers: [StudentGatewayController],
  providers: [StudentGatewayService],
})
export class StudentGatewayModule {}
