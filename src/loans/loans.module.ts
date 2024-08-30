import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { LoanRequestRepository } from './loan.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanRequest } from './entities/loan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoanRequest])],
  controllers: [LoansController],
  providers: [LoansService, LoanRequestRepository],
})
export class LoansModule {}
