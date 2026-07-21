import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { DeductionService } from './deduction.service';
import { CreateDeductionDto } from './dto/create-deduction.dto';
import { UpdateDeductionDto } from './dto/update-deduction.dto';

@Controller('deductions')
export class DeductionController {
  constructor(private readonly deductionService: DeductionService) {}

  @Post()
  create(@Body() createDeductionDto: CreateDeductionDto) {
    return this.deductionService.create(createDeductionDto);
  }

  @Get()
  findAll() {
    return this.deductionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deductionService.findOne(+id);
  }

  @Get('team/:teamId')
  findByTeam(@Param('teamId') teamId: string) {
    return this.deductionService.findByTeam(+teamId);
  }

  @Get('pending/team/:teamId')
  findPendingByTeam(@Param('teamId') teamId: string) {
    return this.deductionService.findPendingByTeam(+teamId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeductionDto: UpdateDeductionDto) {
    return this.deductionService.update(+id, updateDeductionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deductionService.remove(+id);
  }

  @Post(':id/apply')
  apply(@Param('id') id: string) {
    return this.deductionService.applyDeduction(+id);
  }
}
