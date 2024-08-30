import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { VehicleRepository } from './vehicle.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleValuation } from './entities/valuation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, VehicleValuation])],
  controllers: [VehiclesController],
  providers: [VehiclesService, VehicleRepository],
})
export class VehiclesModule {}
