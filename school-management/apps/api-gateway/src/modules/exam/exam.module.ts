import { Module } from '@nestjs/common';
import { ExamGatewayController } from './exam.controller';
import { ExamGatewayService } from './exam.service';

@Module({
  controllers: [ExamGatewayController],
  providers: [ExamGatewayService],
})
export class ExamGatewayModule {}
