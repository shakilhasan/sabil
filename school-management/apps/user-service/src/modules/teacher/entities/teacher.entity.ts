import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  tenantId: string;

  @Column({ length: 255 })
  userId: string;

  @Index({ unique: true })
  @Column({ length: 100 })
  employeeId: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Index()
  @Column({ length: 255 })
  email: string;

  @Column({ length: 255, nullable: true })
  qualification: string;

  @Column({ length: 100, nullable: true })
  designation: string;

  @Column({ type: 'json', nullable: true })
  subjects: string[];

  @Column({ length: 30, nullable: true })
  phone: string;

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
