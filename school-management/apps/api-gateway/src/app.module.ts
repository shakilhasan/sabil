import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard, RolesGuard } from '@app/common';
import { KafkaModule } from '@app/kafka';
import {
  KAFKA_AUTH_SERVICE,
  KAFKA_TENANT_SERVICE,
  KAFKA_USER_SERVICE,
  KAFKA_ACADEMIC_SERVICE,
  KAFKA_EXAM_SERVICE,
} from '@app/kafka';

import { AuthGatewayModule } from './modules/auth/auth.module';
import { TenantGatewayModule } from './modules/tenant/tenant.module';
import { StudentGatewayModule } from './modules/student/student.module';
import { TeacherGatewayModule } from './modules/teacher/teacher.module';
import { ClassGatewayModule } from './modules/class/class.module';
import { SubjectGatewayModule } from './modules/subject/subject.module';
import { SemesterGatewayModule } from './modules/semester/semester.module';
import { TimetableGatewayModule } from './modules/timetable/timetable.module';
import { ExamGatewayModule } from './modules/exam/exam.module';
import { ResultGatewayModule } from './modules/result/result.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
    }),
    KafkaModule.register([
      { name: KAFKA_AUTH_SERVICE, groupId: 'gateway-auth' },
      { name: KAFKA_TENANT_SERVICE, groupId: 'gateway-tenant' },
      { name: KAFKA_USER_SERVICE, groupId: 'gateway-user' },
      { name: KAFKA_ACADEMIC_SERVICE, groupId: 'gateway-academic' },
      { name: KAFKA_EXAM_SERVICE, groupId: 'gateway-exam' },
    ]),
    AuthGatewayModule,
    TenantGatewayModule,
    StudentGatewayModule,
    TeacherGatewayModule,
    ClassGatewayModule,
    SubjectGatewayModule,
    SemesterGatewayModule,
    TimetableGatewayModule,
    ExamGatewayModule,
    ResultGatewayModule,
  ],
  providers: [
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
