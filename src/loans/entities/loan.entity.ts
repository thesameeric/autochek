import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum LoanApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
}

@Entity()
export class LoanRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  othernames: string;

  @Column()
  email: string;

  @Column()
  nin: number;

  @Column()
  phone: string;

  @Column()
  reasonForLoan: string;

  @Column()
  income: number;

  @Column()
  dob: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  requestedAmount: number;

  @Column()
  loanTermMonths: number;

  @Column({
    type: 'varchar',
    default: LoanApplicationStatus.PENDING,
  })
  status: LoanApplicationStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
