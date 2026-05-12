import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantDatabaseService {
  private readonly logger = new Logger(TenantDatabaseService.name);
  private readonly connections = new Map<string, DataSource>();

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async getTenantDataSource(
    tenantSlug: string,
    entities: any[],
  ): Promise<DataSource> {
    const cached = this.connections.get(tenantSlug);
    if (cached?.isInitialized) return cached;

    const tenant = await this.tenantRepository.findOne({
      where: { slug: tenantSlug },
    });
    if (!tenant) {
      throw new NotFoundException(`Tenant '${tenantSlug}' not found`);
    }

    return this.createDataSource(tenant, entities);
  }

  async getTenantDataSourceById(
    tenantId: string,
    entities: any[],
  ): Promise<DataSource> {
    const tenant = await this.tenantRepository.findOne({
      where: { id: tenantId },
    });
    if (!tenant) {
      throw new NotFoundException(`Tenant '${tenantId}' not found`);
    }

    const cached = this.connections.get(tenant.slug);
    if (cached?.isInitialized) return cached;

    return this.createDataSource(tenant, entities);
  }

  private async createDataSource(
    tenant: Tenant,
    entities: any[],
  ): Promise<DataSource> {
    const dataSource = new DataSource({
      type: 'mysql',
      host: tenant.dbHost,
      port: tenant.dbPort,
      username: tenant.dbUsername,
      password: tenant.dbPassword,
      database: tenant.dbName,
      entities,
      synchronize: true,
      logging: false,
    });

    await dataSource.initialize();
    this.connections.set(tenant.slug, dataSource);
    this.logger.log(`Connected to tenant DB: ${tenant.dbName}`);
    return dataSource;
  }

  async provisionTenantDatabase(tenant: Tenant): Promise<void> {
    // Connect without a specific DB to create it
    const rootDataSource = new DataSource({
      type: 'mysql',
      host: tenant.dbHost,
      port: tenant.dbPort,
      username: tenant.dbUsername,
      password: tenant.dbPassword,
      entities: [],
      synchronize: false,
    });

    await rootDataSource.initialize();
    await rootDataSource.query(
      `CREATE DATABASE IF NOT EXISTS \`${tenant.dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await rootDataSource.destroy();
    this.logger.log(`Provisioned database: ${tenant.dbName}`);
  }

  async closeTenantConnection(tenantSlug: string): Promise<void> {
    const ds = this.connections.get(tenantSlug);
    if (ds?.isInitialized) {
      await ds.destroy();
      this.connections.delete(tenantSlug);
    }
  }
}
