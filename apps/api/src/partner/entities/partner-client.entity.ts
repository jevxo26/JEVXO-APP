import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Partner } from './partner.entity';

@Entity('partner_clients')
export class PartnerClient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  partnerId: number;

  @ManyToOne(() => Partner, (partner) => partner.clients, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'partnerId' })
  partner: Partner;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: 'SaaS Pro Package' })
  plan: string;

  @Column({ default: '$850.00' })
  monthlyFee: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ type: 'date', nullable: true })
  renewalDate: Date;

  @Column({ type: 'date', nullable: true })
  joinedDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
