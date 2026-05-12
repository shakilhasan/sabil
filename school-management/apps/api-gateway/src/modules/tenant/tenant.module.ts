import { Module } from '@nestjs/common';
import { TenantGatewayController } from './tenant.controller';
import { TenantGatewayService } from './tenant.service';

@Module({
  controllers: [TenantGatewayController],
  providers: [TenantGatewayService],
})
export class TenantGatewayModule {}
