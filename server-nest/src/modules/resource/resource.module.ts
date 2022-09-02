import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Resource, ResourceSchema } from '../../entities/resource.entity';
import { ResourceRepository } from '../../repositories/resource.repository';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Resource.name, schema: ResourceSchema }])],
    controllers: [ResourceController],
    providers: [ResourceService, ResourceRepository],
    exports: [ResourceService, ResourceRepository],
})
export class ResourceModule {}
