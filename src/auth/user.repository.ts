import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
  ) {}

  async save(userData: CreateUserDto): Promise<User> {
    return this.user.save(userData);
  }

  async findOne(key: 'id' | 'email', id: number | string): Promise<User> {
    return this.user.findOneBy({ [key]: id });
  }

  async update(id: number, data: CreateUserDto): Promise<User> {
    const item = await this.user.findOneBy({ id });
    if (!item) throw new NotFoundException('User not found');

    Object.assign(item, data);
    return this.user.save(item);
  }
}
