// import { LoginUsersDto } from '../user/dto/loginUsers.dto';
import { JwtPayload } from './jwt-payload.interface';
import { Controller, Get, UseGuards, Post, Body, Response, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Post('login')
    async login(@Body() payload: JwtPayload) {
        const user = await this.userService.findByUsername(payload);
        console.log("login user----",user);
        if (user) {
            if (await this.userService.compareHash(payload.password, user['passwordHash'])) {
                return await this.authService.createToken({...payload, roleAlias:user['roleAlias']});
            } else {
                throw new HttpException({
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'Wrong username or password',
                }, HttpStatus.UNAUTHORIZED);
            }
        }
    }

    @Post('token')
    async createToken(@Body() payload: JwtPayload): Promise<any> {
        return await this.authService.createToken(payload);
    }

    @Get('data')
    @UseGuards(AuthGuard())
    findAll() {
        // This route is restricted by AuthGuard
    }
}
