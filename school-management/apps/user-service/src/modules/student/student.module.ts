import { Module } from '@nestjs/common';
import { TenantDatabaseService } from '@app/database';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  providers: [StudentService, TenantDatabaseService],
  controllers: [StudentController],
  exports: [StudentService],
})
export class StudentModule {}
