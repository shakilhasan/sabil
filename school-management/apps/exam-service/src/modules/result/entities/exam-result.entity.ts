import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('exam_results')
export class ExamResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ length: 100 })
  tenantId: string;

  @Index()
  @Column({ length: 255 })
  examId: string;

  @Index()
  @Column({ length: 255 })
  studentId: string;

  @Column({ length: 255 })
  subjectId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  marksObtained: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalMarks: number;

  /**
   * Computed: (marksObtained / totalMarks) * 100, rounded to 2 decimal places.
   */
  @Column({ type: 'decimal', precision: 6, scale: 2 })
  percentage: number;

  /**
   * Computed: A+ (>=90), A (>=80), B (>=70), C (>=60), D (>=50), F (<50).
   */
  @Column({ length: 5 })
  grade: string;

  /**
   * Computed: marksObtained >= passingMarks of the associated exam.
   * Stored directly from the DTO-supplied passingMarks threshold.
   */
  @Column({ default: false })
  isPassed: boolean;

  /**
   * Filled after calculateRankings() is called for the exam.
   */
  @Column({ type: 'int', nullable: true })
  rank: number;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
