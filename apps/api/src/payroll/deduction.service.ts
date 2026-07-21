import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Deduction } from './entities/deduction.entity';
import { Payroll } from './entities/payroll.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { CreateDeductionDto } from './dto/create-deduction.dto';
import { UpdateDeductionDto } from './dto/update-deduction.dto';

@Injectable()
export class DeductionService {
  constructor(
    @InjectRepository(Deduction)
    private deductionRepository: Repository<Deduction>,
    @InjectRepository(Payroll)
    private payrollRepository: Repository<Payroll>,
    @InjectRepository(OurTeam)
    private ourTeamRepository: Repository<OurTeam>,
  ) {}

  create(createDeductionDto: CreateDeductionDto) {
    const deduction = this.deductionRepository.create(createDeductionDto);
    return this.deductionRepository.save(deduction);
  }

  findAll() {
    return this.deductionRepository.find({
      relations: ['team', 'team.department'],
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.deductionRepository.findOne({
      where: { id },
      relations: ['team', 'team.department', 'project', 'task'],
    });
  }

  findByTeam(teamId: number) {
    return this.deductionRepository.find({
      where: { teamId },
      relations: ['team'],
      order: { createdAt: 'DESC' },
    });
  }

  findPendingByTeam(teamId: number) {
    return this.deductionRepository.find({
      where: { teamId, payrollId: IsNull() },
      relations: ['team'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: number, updateDeductionDto: UpdateDeductionDto) {
    const deduction = await this.findOne(id);
    if (!deduction) {
      throw new NotFoundException(`Deduction #${id} not found`);
    }

    if (deduction.payrollId) {
      throw new NotFoundException(
        `Cannot update deduction #${id} because it has already been processed in a payroll.`,
      );
    }

    Object.assign(deduction, updateDeductionDto);

    // If teamId is being updated, we must clear the loaded team relation
    // otherwise TypeORM prioritizes the existing relation object over the new ID
    if (updateDeductionDto.teamId) {
      deduction.team = null as any;
    }

    return this.deductionRepository.save(deduction);
  }

  async remove(id: number) {
    const deduction = await this.findOne(id);
    if (!deduction) {
      throw new NotFoundException(`Deduction #${id} not found`);
    }
    return this.deductionRepository.remove(deduction);
  }

  async applyDeduction(id: number) {
    const deduction = await this.findOne(id);
    if (!deduction) throw new NotFoundException(`Deduction #${id} not found`);
    if (deduction.payrollId) throw new BadRequestException(`Deduction #${id} is already applied to a payroll`);

    const currentDate = new Date();
    const periodYear = currentDate.getFullYear();
    const periodMonth = currentDate.getMonth() + 1; // 1-12

    // Find existing payroll for this period
    let payroll = await this.payrollRepository.findOne({
      where: {
        teamId: deduction.teamId,
        periodYear,
        periodMonth,
      },
    });

    if (!payroll) {
      // Create new payroll if not exists
      const team = await this.ourTeamRepository.findOne({
        where: { id: deduction.teamId },
      });
      if (!team) throw new NotFoundException(`Team member not found`);

      payroll = this.payrollRepository.create({
        teamId: team.id,
        periodYear,
        periodMonth,
        baseSalary: team.salary || 0,
        bonus: 0,
        deductions: 0,
        netPay: 0,
        status: 'Pending',
      });
    } else {
      if (payroll.status === 'Paid') {
        throw new BadRequestException(`Detailed payroll for period ${periodMonth}/${periodYear} is already PAID`);
      }
    }

    // Update payroll totals
    const currentDeductions = Number(payroll.deductions) || 0;
    const newDeductionAmount = Number(deduction.amount) || 0;
    
    payroll.deductions = currentDeductions + newDeductionAmount;
    
    // Recalculate net pay
    const base = Number(payroll.baseSalary) || 0;
    const bonus = Number(payroll.bonus) || 0;
    // ensure no negative net pay?
    const rawNet = base + bonus - payroll.deductions;
    payroll.netPay = rawNet > 0 ? rawNet : 0;

    const savedPayroll = await this.payrollRepository.save(payroll);

    // Link deduction to payroll
    deduction.payrollId = savedPayroll.id;
    await this.deductionRepository.save(deduction);

    return { message: 'Deduction applied successfully', payrollId: savedPayroll.id };
  }
}
