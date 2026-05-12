import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum DayOfWeek {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
}

@Entity('timetables')
export class Timetable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ length: 100 })
  tenantId: string;

  @Index()
  @Column({ length: 255 })
  classId: string;

  @Column({ length: 255 })
  subjectId: string;

  @Column({ length: 255 })
  teacherId: string;

  @Index()
  @Column({ length: 255 })
  semesterId: string;

  @Column({
    type: 'enum',
    enum: DayOfWeek,
  })
  dayOfWeek: DayOfWeek;

  @Column({ length: 10 })
  startTime: string;

  @Column({ length: 10 })
  endTime: string;

  @Column({ length: 100, nullable: true })
  room: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
