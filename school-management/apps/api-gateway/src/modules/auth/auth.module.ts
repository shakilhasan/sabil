import { Module } from '@nestjs/common';
import { AuthGatewayController } from './auth.controller';
import { AuthGatewayService } from './auth.service';

@Module({
  controllers: [AuthGatewayController],
  providers: [AuthGatewayService],
})
export class AuthGatewayModule {}
