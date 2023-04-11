import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entity/location.entity';
import { CreateLocationDto } from './dto/createLocation.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}
  private readonly logger = new Logger(LocationService.name);
  async createLocation(
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    const location = this.locationRepository.create(createLocationDto);
    return this.locationRepository.save(location);
  }

  async getLocationById(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({ where: { id } });
    if (!location) {
      this.logger.log(`Location with ID ${id} not found`);
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return location;
  }

  async getAllLocations(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  async updateLocation(
    id: number,
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    const location = await this.getLocationById(id);
    location.building = createLocationDto.building;
    location.location_name = createLocationDto.location_name;
    location.location_number = createLocationDto.location_number;
    location.area = createLocationDto.area;
    return this.locationRepository.save(location);
  }

  async deleteLocation(id: number): Promise<void> {
    const result = await this.locationRepository.delete(id);
    if (result.affected === 0) {
      this.logger.log(`Location with ID ${id} not found for delete`);
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
  }
}
