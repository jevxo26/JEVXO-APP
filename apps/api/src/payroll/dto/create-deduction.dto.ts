import { IsNumber, IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class CreateDeductionDto {
  @IsNumber()
  teamId: number;

  @IsNumber()
  amount: number;

  @IsString()
  reason: string;

  @IsEnum(['PROJECT_PENALTY', 'LEAVE_DEDUCTION', 'MANUAL'])
  type: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsNumber()
  projectId?: number;

  @IsOptional()
  @IsNumber()
  leaveId?: number;

  @IsOptional()
  @IsNumber()
  taskId?: number;
}
