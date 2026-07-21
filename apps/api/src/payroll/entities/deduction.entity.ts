import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OurTeam } from '../../setting/home/our-team/entities/our-team.entity';
import { Project } from '../../projects/entities/project.entity';
import { Task } from '../../projects/entities/task.entity';

@Entity()
export class Deduction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amount: number;

  @Column({ default: 'No reason provided' })
  reason: string;

  @Column({
    type: 'enum',
    enum: ['PROJECT_PENALTY', 'LEAVE_DEDUCTION', 'MANUAL'],
    default: 'MANUAL',
  })
  type: string;

  @Column({ type: 'date', nullable: true })
  date: Date;

  @Column({ nullable: true })
  teamId: number;

  @ManyToOne(() => OurTeam, (team) => team.deductions)
  @JoinColumn({ name: 'teamId' })
  team: OurTeam;

  @Column({ nullable: true })
  projectId: number;
  
  @ManyToOne(() => Project)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column({ nullable: true })
  leaveId: number;

  // @ManyToOne(() => LeaveRequest)
  // @JoinColumn({ name: 'leaveId' })
  // leave: LeaveRequest;

  @Column({ nullable: true })
  payrollId: number;

  @Column({ nullable: true })
  taskId: number;

  @ManyToOne(() => Task)
  @JoinColumn({ name: 'taskId' })
  task: Task;

  // @ManyToOne(() => Payroll, (payroll) => payroll.deductions)
  // @JoinColumn({ name: 'payrollId' })
  // payroll: Payroll;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
