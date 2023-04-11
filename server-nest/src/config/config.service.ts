import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

export class ConfigService {
  private readonly envConfig: Record<string, string>;
  constructor() {
    const result = dotenv.config();
    if (result.error) {
      this.envConfig = process.env;
    } else {
      this.envConfig = result.parsed;
    }
  }

  public get(key: string): string {
    return this.envConfig[key];
  }

  public async getPortConfig() {
    return this.get('PORT');
  }
  public async getMongoConfig() {
    const isMongoDbUrl = JSON.parse(
      this.get('IS_MONGODB_CLOUD_URL')
        ? this.get('IS_MONGODB_CLOUD_URL')
        : 'false',
    );
    const uri = isMongoDbUrl
      ? this.get('MONGODB_CLOUD_URL')
      : `mongodb://${this.get('MONGODB_HOST')}:${this.get(
          'MONGODB_PORT',
        )}/${this.get('MONGODB_NAME')}`;

    return {
      uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }

  // postgresConfig: TypeOrmModuleOptions = {
  //   type: 'postgres',
  //   host: process.env.POSTGRES_HOST,
  //   port: Number(process.env.POSTGRES_PORT),
  //   username: process.env.POSTGRES_USERNAME,
  //   password: process.env.POSTGRES_PASSWORD,
  //   database: process.env.POSTGRES_DATABASE,
  //   entities: ['dist/**/*.entity{.ts,.js}'],
  //   synchronize: true,
  // };
  postgresConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '#sH1404087',
    database: 'sabil',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  };
  public async getPostgresConfig(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.get('POSTGRES_HOST'),
      port: Number(this.get('POSTGRES_PORT')),
      username: this.get('POSTGRES_USERNAME'),
      password: this.get('POSTGRES_PASSWORD'),
      database: this.get('POSTGRES_DATABASE'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }

  public async getMySqlConfig() {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
    };
  }

}
