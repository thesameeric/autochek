import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsPositive, Min } from 'class-validator';
import { Column } from 'typeorm';

export class CheckEligibility {
  @Column({ type: 'date' })
  @Type(() => Date)
  @IsDate()
  dob: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  @IsNumber({}, { message: 'Income must be a number' })
  @IsPositive({ message: 'Income must be positive' })
  @Min(0, { message: 'Income must be at least 0' })
  income: number;
}
