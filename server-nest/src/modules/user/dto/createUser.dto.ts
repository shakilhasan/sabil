import {IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {Schema as MongooseSchema} from "mongoose";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    displayName: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsOptional() roleName: string;
    @IsOptional() roleId: MongooseSchema.Types.ObjectId;
    @IsOptional() roleAlias: string;
    @IsOptional() passwordHash: string;
    @IsOptional() address: string;

    @IsOptional() photoURL: string;
    @IsOptional() country: string;
    @IsOptional() state: string;
    @IsOptional() city: string;
    @IsOptional() zipCode: string;
    @IsOptional() about: string;
    @IsOptional() company: string;
    @IsOptional() status: string;
    @IsOptional() isPublic: string;
    @IsOptional() isVerified: string;

    @IsOptional() followings: any;
    @IsOptional() followers: any;

    @IsOptional() createdBy: MongooseSchema.Types.ObjectId;
    @IsOptional() updatedBy: MongooseSchema.Types.ObjectId;
}
