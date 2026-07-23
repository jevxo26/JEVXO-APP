import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerController } from './partner.controller';
import { PartnerService } from './partner.service';
import { Partner } from './entities/partner.entity';
import { PartnerClient } from './entities/partner-client.entity';
import { PartnerWithdrawal } from './entities/partner-withdrawal.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Partner, PartnerClient, PartnerWithdrawal, OurTeam]),
  ],
  controllers: [PartnerController],
  providers: [PartnerService],
  exports: [PartnerService],
})
export class PartnerModule {}
