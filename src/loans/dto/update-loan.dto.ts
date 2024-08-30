import { PartialType } from '@nestjs/swagger';
import { CreateLoanRequestDto } from './create-loan.dto';

export class UpdateLoanDto extends PartialType(CreateLoanRequestDto) {}
