import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  tenantId: string;

  @Column({ length: 255 })
  userId: string;

  @Index({ unique: true })
  @Column({ length: 100 })
  admissionNumber: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Index()
  @Column({ length: 255 })
  email: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: Gender;

  @Column({ length: 50, nullable: true })
  gradeLevel: string;

  @Column({ length: 255, nullable: true })
  classId: string;

  @Column({ length: 100, nullable: true })
  parentName: string;

  @Column({ length: 30, nullable: true })
  parentPhone: string;

  @Column({ length: 255, nullable: true })
  parentEmail: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 500, nullable: true })
  profilePhoto: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
