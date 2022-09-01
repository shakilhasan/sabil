import {
    BadRequestException,
    UseGuards,
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Res,
    Delete
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';
import {Roles} from "../auth/roles.decorator";
import {RoleEnum} from "../auth/role.enum";
import { RolesGuard } from '../auth/guards/roles.guard';
import {Product} from "../../entities/product.entity";

@UseGuards(RolesGuard)
@Controller('api/products')
export class ProductController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private productService: ProductService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    async createProduct(@Body() createProductDto: CreateProductDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newProduct: any = await this.productService.createProduct(createProductDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newProduct);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            await session.endSession();
        }
    }

    // @UseGuards(AuthGuard('jwt'))
    // @Roles(RoleEnum.SuperAdmin)
    // @Roles(Role.Admin)
    @Post('/search')
    async getAllProducts(@Body() getQueryDto: GetQueryDto, @Res() res: any) {
        const storages: any = await this.productService.getProducts(getQueryDto);
        return res.status(HttpStatus.OK).send(storages);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/detail')
    async getProductById(@Query() query: Product, @Res() res: Response) {
        const storage: any = await this.productService.getProductById(query?.id);
        return res.status(HttpStatus.OK).send(storage);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/update')
    async updateProduct(@Body() updateProductDto: UpdateProductDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newProduct: any = await this.productService.updateProduct(updateProductDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newProduct);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            await session.endSession();
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete')
    async deleteProduct(@Query() query: Product, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const deletedProduct: any = await this.productService.deleteProduct(query.id, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(deletedProduct);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            await session.endSession();
        }
    }
}
