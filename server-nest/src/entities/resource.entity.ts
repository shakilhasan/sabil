import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {User} from "./user.entity";

@Schema()
export class Resource extends Document {

    @Prop({ type: String, unique: true, required: false }) name: string;
    @Prop({ type: String, unique: true, required: false }) alias: string;
    @Prop({ type: String, required: false }) type: string;
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

export const ResourceSchema = SchemaFactory.createForClass(Resource);
