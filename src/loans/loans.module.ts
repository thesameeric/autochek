import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { LoanRequestRepository } from './loan.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanRequest } from './entities/loan.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([LoanRequest])],
  controllers: [LoansController],
  providers: [
    LoansService,
    LoanRequestRepository,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class LoansModule {}
