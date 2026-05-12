import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MasterDatabaseModule } from '@app/database';
import { ExamModule } from './modules/exam/exam.module';
import { ResultModule } from './modules/result/result.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MasterDatabaseModule,
    ExamModule,
    ResultModule,
  ],
})
export class AppModule {}
