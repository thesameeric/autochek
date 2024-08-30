import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleRepository } from './vehicle.repository';
import { vinLookup } from './requests';

@Injectable()
export class VehiclesService {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async create(createVehicleDto: CreateVehicleDto) {
    return await this.vehicleRepository.save(createVehicleDto);
  }

  async findAll() {
    return await this.vehicleRepository.findAll();
  }

  async findOne(id: number) {
    const vehicle = await this.vehicleRepository.findOne('id', id);
    if (!vehicle)
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    return vehicle;
  }

  async valuation(vin: string) {
    const vehicleLookupDetails = await vinLookup(vin);
    let vehicle = await this.vehicleRepository.findOne('vin', vin);

    if (!Object.keys(vehicleLookupDetails).includes('uid'))
      throw new HttpException('Unable to lookup VIN', HttpStatus.BAD_REQUEST);

    if (!vehicle) {
      const createVehicleDto = {
        make: vehicleLookupDetails.make,
        model: vehicleLookupDetails.model,
        year: vehicleLookupDetails.year,
        color: 'Unknown',
        vin,
        trim: vehicleLookupDetails.trim,
        trim_code: vehicleLookupDetails.trim_code,
        weight: vehicleLookupDetails.weight.toString(),
        mileage: vehicleLookupDetails.mileage_adjustment,
        price: vehicleLookupDetails.retail_value,
        description: 'No description provided',
        isAvailable: true,
      } satisfies CreateVehicleDto;
      vehicle = await this.create(createVehicleDto);
    }
    const vehicleValuationData = {
      vin,
      retail_value: vehicleLookupDetails.retail_value,
      msrp_value: vehicleLookupDetails.msrp_value,
      average_trade_in: vehicleLookupDetails.average_trade_in,
    };

    const vehicleValuation =
      await this.vehicleRepository.createValuation(vehicleValuationData);
    vehicle.valuation = vehicleValuation;
    await this.create(vehicle);
    return vehicle;
  }

  update(id: number, updateVehicleDto: CreateVehicleDto) {
    return this.vehicleRepository.update(id, updateVehicleDto);
  }

  async remove(id: number) {
    return await this.vehicleRepository.deleleOne(id);
  }
}
