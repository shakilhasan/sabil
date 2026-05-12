import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MasterDatabaseModule } from '@app/database';
import { ClassModule } from './modules/class/class.module';
import { SubjectModule } from './modules/subject/subject.module';
import { SemesterModule } from './modules/semester/semester.module';
import { TimetableModule } from './modules/timetable/timetable.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MasterDatabaseModule,
    ClassModule,
    SubjectModule,
    SemesterModule,
    TimetableModule,
  ],
})
export class AppModule {}
