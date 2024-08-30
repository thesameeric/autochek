import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  BaseEntity,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';

@Entity()
@Unique(['email']) // Ensures that each email is unique
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 100)
  firstName: string;

  @Column()
  @Length(1, 100)
  otherNames: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Length(8, 100)
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
