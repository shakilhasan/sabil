import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entity/location.entity';
import { LocationRelationship } from '../entity/locationRelationship.entity';

@Injectable()
export class LocationRepository {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(LocationRelationship)
    private locationRelationshipRepository: Repository<LocationRelationship>,
  ) {}

  async createLocation(locationData: Partial<Location>): Promise<Location> {
    const location = this.locationRepository.create(locationData);
    return this.locationRepository.save(location);
  }

  async createLocationRelationship(
    locationRelationshipData: Partial<LocationRelationship>,
  ): Promise<LocationRelationship> {
    const locationRelationship = this.locationRelationshipRepository.create(
      locationRelationshipData,
    );
    return this.locationRelationshipRepository.save(locationRelationship);
  }

  async getLocationById(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({ where: { id } });
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return location;
  }

  async getAllLocations(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  async deleteLocation(locationId: number): Promise<void> {
    const result = await this.locationRepository.delete(locationId);
    if (result.affected === 0) {
      throw new NotFoundException(`Location with ID ${locationId} not found`);
    }
  }

  async createLocationHierarchy(
    ancestorId: number,
    descendantId: number,
    distance: number,
  ): Promise<LocationRelationship> {
    const ancestor = await this.getLocationById(ancestorId);
    const descendant = await this.getLocationById(descendantId);
    if (!ancestor || !descendant) {
      throw new NotFoundException(
        `One or both of the specified locations not found`,
      );
    }
    const existingRelationship =
      await this.locationRelationshipRepository.findOne({
        where: { ancestor, descendant },
      });
    if (existingRelationship) {
      throw new ConflictException(
        `A relationship already exists between the specified locations`,
      );
    }
    const locationRelationshipData = {
      ancestor,
      descendant,
      distance,
    };
    return this.createLocationRelationship(locationRelationshipData);
  }
}
