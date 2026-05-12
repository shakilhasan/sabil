import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum ExamType {
  MIDTERM = 'MIDTERM',
  FINAL = 'FINAL',
  QUIZ = 'QUIZ',
  ASSIGNMENT = 'ASSIGNMENT',
  PRACTICAL = 'PRACTICAL',
}

@Entity('exams')
export class Exam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ length: 100 })
  tenantId: string;

  @Column({ length: 200 })
  name: string;

  @Column({
    type: 'enum',
    enum: ExamType,
  })
  type: ExamType;

  @Index()
  @Column({ length: 255 })
  semesterId: string;

  @Index()
  @Column({ length: 255 })
  classId: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 100 })
  totalMarks: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 33 })
  passingMarks: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
