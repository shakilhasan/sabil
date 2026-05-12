import { Module } from '@nestjs/common';
import { TenantDatabaseService } from '@app/database';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';

@Module({
  providers: [TimetableService, TenantDatabaseService],
  controllers: [TimetableController],
  exports: [TimetableService],
})
export class TimetableModule {}
