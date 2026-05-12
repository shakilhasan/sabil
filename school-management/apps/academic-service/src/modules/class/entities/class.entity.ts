import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('classes')
export class ClassEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ length: 100 })
  tenantId: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50 })
  section: string;

  @Column({ length: 50 })
  gradeLevel: string;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ length: 255, nullable: true })
  classTeacherId: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
