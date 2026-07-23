import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Partner } from './partner.entity';

@Entity('partner_withdrawals')
export class PartnerWithdrawal {
  @PrimaryColumn()
  id: string;

  @Column()
  partnerId: number;

  @ManyToOne(() => Partner, (partner) => partner.withdrawals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'partnerId' })
  partner: Partner;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  paymentMethod: string;

  @Column()
  accountNumber: string;

  @Column({ default: 'in_progress' })
  status: string;

  @Column({ type: 'json', nullable: true })
  timeline: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
