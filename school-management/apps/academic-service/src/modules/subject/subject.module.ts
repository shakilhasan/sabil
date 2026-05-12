import { Module } from '@nestjs/common';
import { TenantDatabaseService } from '@app/database';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';

@Module({
  providers: [SubjectService, TenantDatabaseService],
  controllers: [SubjectController],
  exports: [SubjectService],
})
export class SubjectModule {}
