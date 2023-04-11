import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/createLocation.dto';

@Controller('api/locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async findAll() {
    return this.locationService.getAllLocations();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.locationService.getLocationById(id);
  }

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.createLocation(createLocationDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLocationDto: CreateLocationDto,
  ) {
    return this.locationService.updateLocation(id, updateLocationDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.locationService.deleteLocation(id);
  }
}
