import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../../dto/getQueryDto';
import { Customer } from '../entity/customer.entity';
import { UpdateCustomerDto } from '../dto/updateCustomer.dto';

export class CustomerRepository {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}

  async createCustomer(
    createCustomerDto, //: CreateCustomerDto,
    session: ClientSession,
  ) {
    let customer = new this.customerModel(createCustomerDto);
    try {
      customer = await customer.save({ session });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return customer;
  }

  async updateCustomer(
    updateCustomer: UpdateCustomerDto,
    session: ClientSession,
  ) {
    const actualDate = new Date();
    actualDate.toUTCString();

    const updateData = {
      updatedAt: actualDate,
    };

    let customer;
    try {
      customer = await this.customerModel
        .findOneAndUpdate({ _id: updateCustomer.id }, updateData, {
          new: true,
        })
        .session(session)
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!customer) {
      throw new ConflictException('Error trying to update customer');
    }

    return customer;
  }

  async getCustomers(payload: GetQueryDto) {
    let limit = payload?.pageSize || 0;
    limit = Number(limit);

    let skip = (payload?.current - 1) * limit || 0;
    skip = Number(skip);

    let customers: Customer[];

    try {
      if (limit === 0) {
        customers = await this.customerModel
          .find()
          .populate('client')
          .populate('user', 'name email')
          .skip(skip)
          .sort({ createdAt: -1 })
          .exec();
      } else {
        customers = await this.customerModel
          .find()
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 })
          .exec();
      }

      let response;

      if (customers.length > 0) {
        response = {
          ok: true,
          total: 30,
          data: customers,
          message: 'Get Customers Ok!',
        };
      } else {
        response = {
          ok: true,
          total: 0,
          data: [],
          message: 'No hay customers',
        };
      }
      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getCustomerById(id: MongooseSchema.Types.ObjectId) {
    let customer;
    try {
      customer = await this.customerModel.findById(id).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!customer) {
      throw new NotFoundException('The customer with this id does not exist');
    }

    return customer;
  }
  async findOneCustomer(query) {
    let customer;
    try {
      customer = await this.customerModel.findOne(query).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    // if (!customer) {
    //   throw new NotFoundException('The customer with this id does not exist');
    // }
    return customer;
  }
  async deleteCustomer(
    customerId: MongooseSchema.Types.ObjectId,
    session: ClientSession,
  ) {
    let customer;
    try {
      customer = await this.customerModel
        .findOneAndDelete({ _id: customerId })
        .session(session)
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    if (!customer) {
      throw new ConflictException('Error trying to delete customer');
    }
    return customer;
  }
}
