import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { NotFoundException } from '@nestjs/common';

export class VehicleRepository {
  constructor(
    @InjectRepository(Vehicle)
    private vehicle: Repository<Vehicle>,
  ) {}

  async create(data: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicle.save(data);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicle.find();
  }

  async findOne(id: number): Promise<Vehicle> {
    return this.vehicle.findOneBy({ id });
  }

  async update(id: number, data: CreateVehicleDto): Promise<Vehicle> {
    const item = await this.vehicle.findOneBy({ id });
    if (!item) throw new NotFoundException('Vehicle not found');

    Object.assign(item, data);
    return this.vehicle.save(item);
  }

  async deleleOne(id: number) {
    return await this.vehicle.delete({ id });
  }
}
