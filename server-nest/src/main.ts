import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  const config = new ConfigService();
  await app.listen(await config.getPortConfig());
}
bootstrap();
