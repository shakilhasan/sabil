import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { Resource } from '../entities/resource.entity';
import { CreateResourceDto } from '../modules/resource/dto/createResource.dto';
import { UpdateResourceDto } from '../modules/resource/dto/updateResource.dto';

export class ResourceRepository {
    constructor(@InjectModel(Resource.name) private readonly resourceModel: Model<Resource>) {}

    async createResource(createResourceDto: CreateResourceDto, session: ClientSession) {
        let resource = new this.resourceModel(createResourceDto);
        try {
            resource = await resource.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return resource;
    }

    async updateResource(updateResource: UpdateResourceDto, session: ClientSession) {
        const actualDate = new Date();
        actualDate.toUTCString();

        const updateData = {
            updatedAt: actualDate,
        };

        let resource;
        try {
            resource = await this.resourceModel
                .findOneAndUpdate({ _id: updateResource.id }, updateData, {
                    new: true,
                })
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!resource) {
            throw new ConflictException('Error trying to update resource');
        }

        return resource;
    }

    async getResources(payload: GetQueryDto) {
        let limit = payload?.pageSize || 0;
        limit = Number(limit);


        let skip = (payload?.current - 1) * limit || 0;
        skip = Number(skip);

        let resources: Resource[];

        try {
            if (limit === 0) {
                resources = await this.resourceModel
                    .find()
                    .populate('client')
                    .populate('user', 'name email')
                    .skip(skip)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                resources = await this.resourceModel
                    .find()
                    .skip(skip)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (resources.length > 0) {
                response = {
                    ok: true,
                    total:30,
                    data: resources,
                    message: 'Get Resources Ok!',
                };
            } else {
                response = {
                    ok: true,
                    total:0,
                    data: [],
                    message: 'No hay resources',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getResourceById(id: MongooseSchema.Types.ObjectId) {
        let resource;
        try {
            resource = await this.resourceModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!resource) {
            throw new NotFoundException('The resource with this id does not exist');
        }

        return resource;
    }


    async deleteResource(resourceId: MongooseSchema.Types.ObjectId, session: ClientSession) {
        let resource;
        try {
            resource = await this.resourceModel
                .findOneAndDelete({ _id: resourceId })
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        if (!resource) {
            throw new ConflictException('Error trying to delete resource');
        }
        return resource;
    }
}
