import { Module } from '@nestjs/common';
import { TenantDatabaseService } from '@app/database';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';

@Module({
  providers: [ResultService, TenantDatabaseService],
  controllers: [ResultController],
  exports: [ResultService],
})
export class ResultModule {}
