import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('UserService');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'user-service',
          brokers: (process.env.KAFKA_BROKERS || 'localhost:29092').split(','),
        },
        consumer: {
          groupId: 'user-service-consumer',
        },
      },
    },
  );

  await app.listen();
  logger.log('User Service is listening for Kafka messages');
}

bootstrap();
