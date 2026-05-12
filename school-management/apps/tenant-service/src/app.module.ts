import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MasterDatabaseModule } from '@app/database';
import { TenantModule } from './modules/tenant/tenant.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MasterDatabaseModule,
    TenantModule,
  ],
})
export class AppModule {}
