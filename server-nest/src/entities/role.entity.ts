import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {User} from "./user.entity";

@Schema()
export class Role extends Document {

    @Prop({ type: String, required: false }) name: string;
    @Prop({ type: String, required: false }) title: string;
    @Prop({ type: Boolean, required: false }) isSuperAdmin: boolean;
    @Prop({ type: Boolean, required: false }) isAdmin: boolean;
    @Prop({ type: String, unique: true, required: false }) alias: string;
    @Prop([{
        type: MongooseSchema.Types.ObjectId,
        ref: "Permission",
        required: false,
    }]) permissions!: MongooseSchema.Types.ObjectId[];
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

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
