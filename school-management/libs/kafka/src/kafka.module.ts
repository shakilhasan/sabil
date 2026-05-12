import { Module, DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

export interface KafkaClientOptions {
  name: string;
  groupId: string;
}

@Module({})
export class KafkaModule {
  static register(clients: KafkaClientOptions[]): DynamicModule {
    const kafkaClients = clients.map(({ name, groupId }) => ({
      name,
      useFactory: (config: ConfigService) => ({
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: config.get('KAFKA_CLIENT_ID', 'school-management'),
            brokers: (config.get('KAFKA_BROKERS', 'localhost:29092') as string).split(','),
          },
          consumer: {
            groupId: `${config.get('KAFKA_GROUP_ID_PREFIX', 'school-saas')}-${groupId}`,
          },
        },
      }),
      inject: [ConfigService],
    }));

    return {
      module: KafkaModule,
      imports: [
        ClientsModule.registerAsync(kafkaClients),
      ],
      exports: [ClientsModule],
    };
  }
}
