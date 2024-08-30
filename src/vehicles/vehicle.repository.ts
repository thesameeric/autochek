import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { NotFoundException } from '@nestjs/common';
import { VehicleValuation } from './entities/valuation.entity';

export class VehicleRepository {
  constructor(
    @InjectRepository(Vehicle)
    private vehicle: Repository<Vehicle>,
    @InjectRepository(VehicleValuation)
    private valuation: Repository<VehicleValuation>,
  ) {}

  async save(data: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicle.save(data);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicle.find();
  }

  async findOne(key: 'id' | 'vin', id: number | string): Promise<Vehicle> {
    return this.vehicle.findOneBy({ [key]: id });
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

  async createValuation(data: any) {
    const { vin } = data;
    const valuation = await this.valuation.findOneBy({ vin });
    if (valuation) {
      Object.assign(valuation, data);
      return this.valuation.save(valuation);
    } else {
      return this.valuation.save(data);
    }
  }
}
