import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Blog extends Document {
  @Prop({ type: String, required: false })
  cover: string;

  @Prop({ type: String, required: false })
  title: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({ type: Number, required: false })
  view: number;

  @Prop({ type: Number, required: false })
  comment: number;

  @Prop({ type: Number, required: false })
  share: number;

  @Prop({ type: Number, required: false })
  favorite: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  author: any;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: false,
  })
  authorId: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, required: false })
  avatarUrl: string;

  @Prop({ type: Array })
  tags: [];

  @Prop({ type: String, required: false })
  body: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  favoritePerson: any;

  @Prop({ type: MongooseSchema.Types.Mixed })
  comments: any;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
