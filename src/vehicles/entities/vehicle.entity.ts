import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  BaseEntity,
} from 'typeorm';
import { VehicleValuation } from './valuation.entity';

@Entity()
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  color: string;

  @Column()
  trim: string;

  @Column()
  trim_code: string;

  @Column()
  weight: string;

  @Column()
  vin: string;

  @Column()
  mileage: number;

  @Column()
  price: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: true })
  isAvailable: boolean;

  @OneToOne(() => VehicleValuation, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  valuation: VehicleValuation;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
