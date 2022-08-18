import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({type: String, required: false}) firstName: string;
    @Prop({type: String, required: false}) lastName: string;
    @Prop({ type: String, required: true, unique: true }) username: string;
    @Prop({ type: String, required: true, trim: true }) displayName: string;
    @Prop({ type: String, required: true, index: true, unique: true },) phoneNumber: string;
    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    }) email: string;
    @Prop({type: String, required: false}) roleName: string;
    @Prop({type: MongooseSchema.Types.ObjectId, required: false}) roleId: MongooseSchema.Types.ObjectId;
    @Prop({type: String, required: false}) roleAlias: string;
    @Prop({type: String, required: false}) passwordHash: string;
    @Prop({type: String, required: false}) address: string;

    @Prop({type: String, required: false}) photoURL: string;
    @Prop({type: String, required: false}) country: string;
    @Prop({type: String, required: false}) state: string;
    @Prop({type: String, required: false}) city: string;
    @Prop({type: String, required: false}) zipCode: string;
    @Prop({type: String, required: false}) about: string;
    @Prop({type: String, required: false}) company: string;
    @Prop({type: String, required: false}) status: string;
    @Prop({type: Boolean, required: false, default: true}) isPublic: boolean;
    @Prop({type: Boolean, required: false, default: true}) isVerified: boolean;

    @Prop([{
        type: MongooseSchema.Types.ObjectId,
        ref: "User",
        required: false,
    }]) followings!: MongooseSchema.Types.ObjectId[];
    @Prop([{
        type: MongooseSchema.Types.ObjectId,
        ref: "User",
        required: false,
    }]) followers!: MongooseSchema.Types.ObjectId[];
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        required: false,
        default: "000000000000"
    }) createdBy: MongooseSchema.Types.ObjectId;
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        required: false,
        default: "000000000000"
    }) updatedBy: MongooseSchema.Types.ObjectId;

    @Prop({type: Date, default: Date.now}) updatedAt: Date;
    @Prop({type: Date, default: Date.now}) createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
