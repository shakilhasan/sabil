import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../../dto/getQueryDto';
import { Product } from '../entity/product.entity';
import { CreateProductDto } from '../dto/createProduct.dto';
import { UpdateProductDto } from '../dto/updateProduct.dto';

export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    session: ClientSession,
  ) {
    let product = new this.productModel(createProductDto);
    try {
      product = await product.save({ session });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return product;
  }

  async updateProduct(updateProduct: UpdateProductDto, session: ClientSession) {
    const actualDate = new Date();
    actualDate.toUTCString();

    const updateData = {
      updatedAt: actualDate,
    };

    let product;
    try {
      product = await this.productModel
        .findOneAndUpdate({ _id: updateProduct.id }, updateData, {
          new: true,
        })
        .session(session)
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!product) {
      throw new ConflictException('Error trying to update product');
    }

    return product;
  }

  async getProducts(payload: GetQueryDto) {
    let limit = payload?.pageSize || 0;
    limit = Number(limit);

    let skip = (payload?.current - 1) * limit || 0;
    skip = Number(skip);

    let products: Product[];

    try {
      if (limit === 0) {
        products = await this.productModel
          .find()
          .skip(skip)
          .sort({ createdAt: -1 })
          .exec();
      } else {
        products = await this.productModel
          .find()
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 })
          .exec();
      }

      let response;

      if (products.length > 0) {
        response = {
          ok: true,
          total: 30,
          data: products,
          message: 'Get Products Ok!',
        };
      } else {
        response = {
          ok: true,
          total: 0,
          data: [],
          message: 'No hay products',
        };
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getProductById(id: MongooseSchema.Types.ObjectId) {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!product) {
      throw new NotFoundException('The product with this id does not exist');
    }

    return product;
  }

  async deleteProduct(
    productId: MongooseSchema.Types.ObjectId,
    session: ClientSession,
  ) {
    let product;
    try {
      product = await this.productModel
        .findOneAndDelete({ _id: productId })
        .session(session)
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!product) {
      throw new ConflictException('Error trying to delete product');
    }
    return product;
  }
}
