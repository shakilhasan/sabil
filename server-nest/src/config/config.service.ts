import * as dotenv from 'dotenv';

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
}
