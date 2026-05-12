import { Module } from '@nestjs/common';
import { TenantDatabaseService } from '@app/database';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';

@Module({
  providers: [TeacherService, TenantDatabaseService],
  controllers: [TeacherController],
  exports: [TeacherService],
})
export class TeacherModule {}
