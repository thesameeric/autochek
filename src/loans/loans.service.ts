import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoanRequestDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { LoanRequestRepository } from './loan.repository';
import { UpdateLoanStatusDto } from './dto/update-loan-status.dto';
import { LoanApplicationStatus } from './entities/loan.entity';

@Injectable()
export class LoansService {
  constructor(private readonly loanRepository: LoanRequestRepository) {}

  async create(createLoan: CreateLoanRequestDto) {
    return await this.loanRepository.create(createLoan);
  }

  async updateLoanStatus(id: number, { status }: UpdateLoanStatusDto) {
    const loanRequest = await this.loanRepository.findOne(id);
    if (loanRequest.status === LoanApplicationStatus.APPROVED) {
      throw new HttpException(
        'Cannot update an already approved loan request',
        HttpStatus.CONFLICT,
      );
    }
    return await this.loanRepository.update(id, { status });
  }

  async findAll() {
    return await this.loanRepository.findAll();
  }

  findOne(id: number) {
    return this.loanRepository.findOne(id);
  }

  update(id: number, updateLoanDto: UpdateLoanDto) {
    return this.loanRepository.update(id, updateLoanDto);
  }

  remove(id: number) {
    return this.loanRepository.deleleOne(id);
  }

  checkEligibility(data: { dob: Date; income: number }) {
    const { dob, income } = data;
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDifference = currentDate.getMonth() - dob.getMonth();
    const dayDifference = currentDate.getDate() - dob.getDate();

    // Adjust age if the birthdate hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    if (age < 18) {
      return 'You must be at least 18 years old to be eligible for a loan.';
    }

    // Determine loan eligibility based on income
    let loanAmount: number;
    if (income < 50000) {
      loanAmount = 50000; // Minimum loan amount for low income
    } else if (income >= 50000 && income < 100000) {
      loanAmount = income * 2;
    } else {
      loanAmount = income * 3;
    }

    return `You are eligible for a loan of ₦${loanAmount}.`;
  }
}
