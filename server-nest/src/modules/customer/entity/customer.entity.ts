import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Customer extends Document {
  @Prop({ type: String, required: false }) firstName: string;
  @Prop({ type: String, required: false }) lastName: string;
  @Prop({ type: String, required: false }) city: string;
  @Prop({ type: String, required: false }) state: string;
  @Prop({ type: String, required: false }) zip: string;
  @Prop({ type: String, required: false, unique: true }) phone: string;
  @Prop({ type: String, required: false, unique: true }) email: string;
  @Prop({ type: String, required: false }) ip: string;
  @Prop({ type: Date, default: Date.now }) updatedAt: Date;
  @Prop({ type: Date, default: Date.now }) createdAt: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
