import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ type: String, required: false }) cover: string;
  @Prop({ type: Array }) images: [];
  @Prop({ type: String, required: false }) name: string;
  @Prop({ type: String, unique: true, required: false }) code: string;
  @Prop({ type: String, required: false }) sku: string;
  @Prop({ type: Array }) tags: [];
  @Prop({ type: Number, required: false }) price: number;
  @Prop({ type: Number, required: false }) priceSale: number;

  @Prop({ type: Number, required: false }) totalRating: number;
  @Prop({ type: Number, required: false }) totalReview: number;
  @Prop({ type: Array }) ratings: [];
  @Prop({ type: Array }) reviews: [];

  @Prop({ type: Boolean, required: false }) isVariant: boolean;
  @Prop({ type: String, required: false }) status: string;
  @Prop({ type: Array }) sizes: [];
  @Prop({ type: Number, required: false }) available: number;
  @Prop({ type: String, required: false }) description: string;
  @Prop({ type: Number, required: false }) sold: number;
  @Prop({ type: String, required: false }) category: string;
  @Prop({ type: String, required: false }) gender: string;
  @Prop({ type: Array }) colors: [];

  @Prop({ type: Number, required: false }) cost: number;
  @Prop({ type: Number, required: false }) size: number;
  @Prop({ type: Date, required: false }) manufacturingDate: Date;
  @Prop({ type: Date, required: false }) expiryDate: Date;
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: false,
    default: '000000000000',
  })
  createdBy: MongooseSchema.Types.ObjectId;
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: false,
    default: '000000000000',
  })
  updatedBy: MongooseSchema.Types.ObjectId;

  @Prop({ type: Date, default: Date.now }) updatedAt: Date;
  @Prop({ type: Date, default: Date.now }) createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
