import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../modules/user/dto/createUser.dto';

export class UserRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async createUser(createUserDto: CreateUserDto, session: ClientSession) {
        let user = await this.getUserByEmail(createUserDto.email);

        if (user) {
            throw new ConflictException('User already exists');
        }

        user = new this.userModel(createUserDto);

        try {
            user = await user.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!user) {
            throw new ConflictException('User not created');
        }

        return user;
    }

    async getUserById(id: MongooseSchema.Types.ObjectId) {
        let user;
        try {
            user = await this.userModel.findById({ _id: id });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
    async getUserByUsername(username: string) {
        let user;
        try {
            user = await this.userModel.findOne({ username }, 'username email displayName roleAlias').exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return user;
    }

    async getUserByEmail(email: string) {
        let user;
        try {
            user = await this.userModel.findOne({ email }, 'name email img role').exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return user;
    }
}
