import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoanRequest } from './entities/loan.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateLoanRequestDto } from './dto/create-loan.dto';

export class LoanRequestRepository {
  constructor(
    @InjectRepository(LoanRequest)
    private loan: Repository<LoanRequest>,
  ) {}

  async create(data: CreateLoanRequestDto): Promise<LoanRequest> {
    return this.loan.save(data);
  }

  async findAll(): Promise<LoanRequest[]> {
    return this.loan.find();
  }

  async findOne(id: number): Promise<LoanRequest> {
    return this.loan.findOneBy({ id });
  }

  async update(id: number, data: any): Promise<LoanRequest> {
    const item = await this.loan.findOneBy({ id });
    if (!item) throw new NotFoundException('Loan request not found');

    Object.assign(item, data);
    return this.loan.save(item);
  }

  async deleleOne(id: number) {
    return await this.loan.delete({ id });
  }
}
