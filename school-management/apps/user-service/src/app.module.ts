import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MasterDatabaseModule } from '@app/database';
import { StudentModule } from './modules/student/student.module';
import { TeacherModule } from './modules/teacher/teacher.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MasterDatabaseModule,
    StudentModule,
    TeacherModule,
  ],
})
export class AppModule {}
