import { Module } from '@nestjs/common';
import { TenantDatabaseService } from '@app/database';
import { SemesterService } from './semester.service';
import { SemesterController } from './semester.controller';

@Module({
  providers: [SemesterService, TenantDatabaseService],
  controllers: [SemesterController],
  exports: [SemesterService],
})
export class SemesterModule {}
