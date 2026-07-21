import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { DeductionController } from './deduction.controller';
import { DeductionService } from './deduction.service';
import { Payroll } from './entities/payroll.entity';
import { Deduction } from './entities/deduction.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payroll, Deduction, OurTeam]), CommonModule],
  controllers: [PayrollController, DeductionController],
  providers: [PayrollService, DeductionService],
})
export class PayrollModule {}
