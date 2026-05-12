import { Module } from '@nestjs/common';
import { TenantDatabaseService } from '@app/database';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';

@Module({
  providers: [ClassService, TenantDatabaseService],
  controllers: [ClassController],
  exports: [ClassService],
})
export class ClassModule {}
