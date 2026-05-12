import { Module } from '@nestjs/common';
import { TenantDatabaseService } from '@app/database';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';

@Module({
  providers: [ExamService, TenantDatabaseService],
  controllers: [ExamController],
  exports: [ExamService],
})
export class ExamModule {}
