import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopic } from '@app/common';
import { AuthService, LoginPayload, RegisterPayload } from './auth.service';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @MessagePattern(KafkaTopic.AUTH_LOGIN)
  async login(@Payload() data: LoginPayload) {
    this.logger.log(`Received AUTH_LOGIN for email=${data?.email}`);
    return this.authService.login(data);
  }

  @MessagePattern(KafkaTopic.AUTH_REGISTER)
  async register(@Payload() data: RegisterPayload) {
    this.logger.log(`Received AUTH_REGISTER for email=${data?.email}`);
    return this.authService.register(data);
  }
}
