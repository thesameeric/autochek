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
}
