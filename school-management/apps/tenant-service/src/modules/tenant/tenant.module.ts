import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Tenant, TenantDatabaseService } from '@app/database';
import { KafkaModule } from '@app/kafka';
import { KAFKA_AUTH_SERVICE } from '@app/kafka';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant]),
    ConfigModule,
    KafkaModule.register([
      { name: KAFKA_AUTH_SERVICE, groupId: 'tenant-service-auth' },
    ]),
  ],
  providers: [TenantService, TenantDatabaseService],
  controllers: [TenantController],
  exports: [TenantService],
})
export class TenantModule {}
