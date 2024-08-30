import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleRepository } from './vehicle.repository';

@Injectable()
export class VehiclesService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async create(createVehicleDto: CreateVehicleDto) {
    return await this.vehicleRepository.create(createVehicleDto);
  }

  async findAll() {
    return await this.vehicleRepository.findAll();
  }

  async findOne(id: number) {
    return await this.vehicleRepository.findOne(id);
  }

  update(id: number, updateVehicleDto: CreateVehicleDto) {
    return this.vehicleRepository.update(id, updateVehicleDto);
  }

  async remove(id: number) {
    return await this.vehicleRepository.deleleOne(id);
  }
}
