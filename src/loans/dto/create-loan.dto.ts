import {
  IsString,
  IsEmail,
  IsNumber,
  IsInt,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateLoanRequestDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  othernames: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString(null)
  @IsNotEmpty()
  nin: number;

  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  reasonForLoan: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  requestedAmount: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  loanTermMonths: number;
}
