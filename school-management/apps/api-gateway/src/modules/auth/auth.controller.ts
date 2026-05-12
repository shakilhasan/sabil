import {
  Controller,
  Post,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { SetMetadata } from '@nestjs/common';
import { AuthGatewayService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { IS_PUBLIC_KEY } from '@app/common';

@ApiTags('Auth')
@Controller('auth')
export class AuthGatewayController {
  constructor(private readonly authService: AuthGatewayService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @SetMetadata(IS_PUBLIC_KEY, true)
  @ApiOperation({ summary: 'Login user' })
  @ApiHeader({ name: 'X-Tenant-ID', required: true })
  login(
    @Body() dto: LoginDto,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.authService.login(dto, tenantSlug);
  }

  @Post('register')
  @SetMetadata(IS_PUBLIC_KEY, true)
  @ApiOperation({ summary: 'Register user (school admin registers staff/students)' })
  @ApiHeader({ name: 'X-Tenant-ID', required: true })
  register(
    @Body() dto: RegisterDto,
    @Headers('x-tenant-id') tenantSlug: string,
  ) {
    return this.authService.register(dto, tenantSlug);
  }
}
