import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OurTeam } from '../../setting/home/our-team/entities/our-team.entity';
import { PartnerClient } from './partner-client.entity';
import { PartnerWithdrawal } from './partner-withdrawal.entity';

@Entity('partners')
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userId: number;

  @OneToOne(() => OurTeam, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: OurTeam;

  @Column({ unique: true, nullable: true })
  partnerCode: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 20.0 })
  commissionRate: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0.0 })
  balance: number;

  @Column({ default: 'active' })
  status: string;

  @Column({ type: 'date', nullable: true })
  joinedDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PartnerClient, (client) => client.partner)
  clients: PartnerClient[];

  @OneToMany(() => PartnerWithdrawal, (withdrawal) => withdrawal.partner)
  withdrawals: PartnerWithdrawal[];
}
