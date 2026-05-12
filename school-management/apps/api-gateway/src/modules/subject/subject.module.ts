import { Module } from '@nestjs/common';
import { SubjectGatewayController } from './subject.controller';
import { SubjectGatewayService } from './subject.service';

@Module({
  controllers: [SubjectGatewayController],
  providers: [SubjectGatewayService],
})
export class SubjectGatewayModule {}
