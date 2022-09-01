import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlogModule } from './modules/blog/blog.module';
import { ProductModule } from './modules/product/product.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import { ResourceModule } from './modules/resource/resource.module';

@Module({
    imports: [
        ConfigModule,
        // MongoDB Connection
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
        }),
        AuthModule,
        UserModule,
        BlogModule,
        ProductModule,
        PermissionModule,
        RoleModule,
        ResourceModule,

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
