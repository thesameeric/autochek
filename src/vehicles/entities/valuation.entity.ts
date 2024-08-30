import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class VehicleValuation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vin: string;

  @Column()
  retail_value: string;

  @Column()
  msrp_value: string; // manufacturer's suggested retail price

  @Column()
  average_trade_in: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
