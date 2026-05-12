import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Tenant } from './entities/tenant.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('MASTER_DB_HOST', 'localhost'),
        port: config.get<number>('MASTER_DB_PORT', 3306),
        username: config.get('MASTER_DB_USERNAME', 'root'),
        password: config.get('MASTER_DB_PASSWORD', ''),
        database: config.get('MASTER_DB_NAME', 'school_saas_master'),
        entities: [Tenant],
        synchronize: config.get('NODE_ENV') !== 'production',
        logging: config.get('NODE_ENV') === 'development',
      }),
    }),
    TypeOrmModule.forFeature([Tenant]),
  ],
  exports: [TypeOrmModule],
})
export class MasterDatabaseModule {}
