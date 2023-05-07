import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { CustomerRepository } from './repository/customer.repository';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { UpdateCustomerDto } from './dto/updateCustomer.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
    session: ClientSession,
  ) {
    const data = fs.readFileSync(
      path.resolve(__dirname, '../../../files/1M-customers.txt'),
    );
    const splitCustomer = data.toString().split('\r\n');
    const customers: any = splitCustomer.map((d) => {
      const values = d.split(',');
      return [
        'firstName',
        'lastName',
        'city',
        'state',
        'zip',
        'phone',
        'email',
        'ip',
      ].reduce((acc, curr, index) => {
        acc[curr] = values[index];
        return acc;
      }, {});
    });
    let i = 0;
    const invalidCustomers = [];
    for (const customer of customers) {
      i++;
      if (
        await this.customerRepository.findOneCustomer({
          $or: [{ email: customer?.email }, { phone: customer?.phone }],
        })
      )
        continue;
      if (
        !customer?.email.match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        )
      ) {
        invalidCustomers.push(customer);
        continue;
      }
      await this.customerRepository.createCustomer(customer, session);
      if (i > 3) break;
    }
    const res = await this.customerRepository.getCustomers({
      pageSize: 1000000,
      current: 1,
    });
    fs.writeFileSync('files/valid-customers.txt', JSON.stringify(res.data));
    fs.writeFileSync(
      'files/invalid-customers.txt',
      JSON.stringify(invalidCustomers),
    );
    return {};
  }

  async getCustomerById(customerId: MongooseSchema.Types.ObjectId) {
    return await this.customerRepository.getCustomerById(customerId);
  }

  async getCustomers(getQueryDto: GetQueryDto) {
    return await this.customerRepository.getCustomers(getQueryDto);
  }

  async updateCustomer(
    updateCustomerDto: UpdateCustomerDto,
    session: ClientSession,
  ) {
    return await this.customerRepository.updateCustomer(
      updateCustomerDto,
      session,
    );
  }

  async deleteCustomer(
    customerId: MongooseSchema.Types.ObjectId,
    session: ClientSession,
  ) {
    return await this.customerRepository.deleteCustomer(customerId, session);
  }
}
