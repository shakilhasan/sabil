import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entity/location.entity';
import { LocationRelationship } from './entity/locationRelationship.entity';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location, LocationRelationship])],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
