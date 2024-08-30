import { Injectable } from '@nestjs/common';
import { CreateLoanRequestDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { LoanRequestRepository } from './loan.repository';

@Injectable()
export class LoansService {
  constructor(private readonly loanRepository: LoanRequestRepository) {}

  async create(createLoan: CreateLoanRequestDto) {
    return await this.loanRepository.create(createLoan);
  }

  async findAll() {
    return await this.loanRepository.findAll();
  }

  findOne(id: number) {
    return this.loanRepository.findOne(id);
  }

  update(id: number, updateLoanDto: UpdateLoanDto) {
    return this.update(id, updateLoanDto);
  }

  remove(id: number) {
    return this.loanRepository.deleleOne(id);
  }
}
