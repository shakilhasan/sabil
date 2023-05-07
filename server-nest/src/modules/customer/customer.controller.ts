import {
  BadRequestException,
  UseGuards,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
  Delete,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { UpdateCustomerDto } from './dto/updateCustomer.dto';
import { CustomerService } from './customer.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RoleEnum } from '../auth/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Customer } from './entity/customer.entity';

@UseGuards(RolesGuard)
@Controller('api/customers')
export class CustomerController {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
    private customerService: CustomerService,
  ) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const newCustomer: any = await this.customerService.createCustomer(
        createCustomerDto,
        session,
      );
      await session.commitTransaction();
      return res.status(HttpStatus.OK).send(newCustomer);
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles(RoleEnum.SuperAdmin)
  // @Customers(Customer.Admin)
  @Post('/search')
  async getAllCustomers(@Body() getQueryDto: GetQueryDto, @Res() res: any) {
    const storages: any = await this.customerService.getCustomers(getQueryDto);
    return res.status(HttpStatus.OK).send(storages);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/detail')
  async getCustomerById(@Query() query: Customer, @Res() res: Response) {
    const storage: any = await this.customerService.getCustomerById(query?.id);
    return res.status(HttpStatus.OK).send(storage);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update')
  async updateCustomer(
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const newCustomer: any = await this.customerService.updateCustomer(
        updateCustomerDto,
        session,
      );
      await session.commitTransaction();
      return res.status(HttpStatus.OK).send(newCustomer);
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete')
  async deleteCustomer(@Query() query: Customer, @Res() res: Response) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const deletedCustomer: any = await this.customerService.deleteCustomer(
        query.id,
        session,
      );
      await session.commitTransaction();
      return res.status(HttpStatus.OK).send(deletedCustomer);
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      session.endSession();
    }
  }
}
