import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { ResourceRepository } from '../../repositories/resource.repository';
import { CreateResourceDto } from './dto/createResource.dto';
import { UpdateResourceDto } from './dto/updateResource.dto';

@Injectable()
export class ResourceService {
    constructor(private resourceRepository: ResourceRepository) {}

    async createResource(createResourceDto: CreateResourceDto, session: ClientSession) {
        return await this.resourceRepository.createResource(createResourceDto, session);
    }

    async getResourceById(resourceId: MongooseSchema.Types.ObjectId) {
        return await this.resourceRepository.getResourceById(resourceId);
    }

    async getResources(getQueryDto: GetQueryDto) {
        return await this.resourceRepository.getResources(getQueryDto);
    }

    async updateResource(updateResourceDto: UpdateResourceDto, session: ClientSession) {
        return await this.resourceRepository.updateResource(updateResourceDto, session);
    }

    async deleteResource(resourceId: MongooseSchema.Types.ObjectId, session: ClientSession) {
        return await this.resourceRepository.deleteResource(resourceId, session);
    }
}
