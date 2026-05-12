import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('AcademicService');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'academic-service',
          brokers: (
            process.env.KAFKA_BROKERS || 'localhost:29092'
          ).split(','),
        },
        consumer: {
          groupId: 'academic-service-consumer',
        },
      },
    },
  );

  await app.listen();
  logger.log('Academic Service is listening for Kafka messages');
}

bootstrap();
