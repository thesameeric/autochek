import { IsNotEmpty, IsEnum } from 'class-validator';
import { LoanApplicationStatus } from '../entities/loan.entity';
import { Transform } from 'class-transformer';

export class UpdateLoanStatusDto {
  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(LoanApplicationStatus)
  @IsNotEmpty()
  status: LoanApplicationStatus;
}
