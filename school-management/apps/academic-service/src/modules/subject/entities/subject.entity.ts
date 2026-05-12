import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ length: 100 })
  tenantId: string;

  @Column({ length: 150 })
  name: string;

  @Index({ unique: true })
  @Column({ length: 50 })
  code: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 255 })
  classId: string;

  @Column({ length: 255, nullable: true })
  teacherId: string;

  @Column({ type: 'int', default: 1 })
  creditHours: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
