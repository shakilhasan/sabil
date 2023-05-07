import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Customer, CustomerSchema } from './entity/customer.entity';
import { CustomerRepository } from './repository/customer.repository';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
  exports: [CustomerService, CustomerRepository],
})
export class CustomerModule {}
