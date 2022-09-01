import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Permission extends Document {
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: "Role",
        required: false,
    }) roleId: MongooseSchema.Types.ObjectId;
    @Prop({ type: String, required: false }) roleName: string;
    @Prop({ type: String, required: false }) roleAlias: string;
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: "Resource",
        required: false,
    }) resourceId: MongooseSchema.Types.ObjectId;
    @Prop({ type: String, required: false }) resourceName: string;
    @Prop({ type: String, required: false }) resourceAlias: string;
    @Prop({ type: Boolean, required: false }) isAllowed: boolean;
    @Prop({ type: Boolean, required: false }) isDisabled: boolean;
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        default: "000000000000",
        required: false,
    }) createdBy: MongooseSchema.Types.ObjectId;
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        default: "000000000000",
        required: false,
    }) updatedBy: MongooseSchema.Types.ObjectId;
    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
