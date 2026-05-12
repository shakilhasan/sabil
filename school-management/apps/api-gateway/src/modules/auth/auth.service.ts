import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_AUTH_SERVICE } from '@app/kafka';
import { KafkaTopic } from '@app/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthGatewayService {
  constructor(
    @Inject(KAFKA_AUTH_SERVICE) private readonly authClient: ClientKafka,
  ) {}

  async onModuleInit() {
    [KafkaTopic.AUTH_LOGIN, KafkaTopic.AUTH_REGISTER, KafkaTopic.AUTH_VALIDATE_TOKEN].forEach(
      (topic) => this.authClient.subscribeToResponseOf(topic),
    );
    await this.authClient.connect();
  }

  login(dto: LoginDto, tenantSlug: string) {
    return this.authClient.send(KafkaTopic.AUTH_LOGIN, { ...dto, tenantSlug });
  }

  register(dto: RegisterDto, tenantSlug: string) {
    return this.authClient.send(KafkaTopic.AUTH_REGISTER, { ...dto, tenantSlug });
  }
}
