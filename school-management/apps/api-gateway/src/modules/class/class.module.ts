import { Module } from '@nestjs/common';
import { ClassGatewayController } from './class.controller';
import { ClassGatewayService } from './class.service';

@Module({
  controllers: [ClassGatewayController],
  providers: [ClassGatewayService],
})
export class ClassGatewayModule {}
