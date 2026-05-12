import { Module } from '@nestjs/common';
import { ResultGatewayController } from './result.controller';
import { ResultGatewayService } from './result.service';

@Module({
  controllers: [ResultGatewayController],
  providers: [ResultGatewayService],
})
export class ResultGatewayModule {}
