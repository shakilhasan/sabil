import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Tenant, TenantDatabaseService } from '@app/database';
import {
  KafkaTopic,
  Role,
  SubscriptionPlan,
  TenantStatus,
  PaginatedResult,
} from '@app/common';
import { KAFKA_AUTH_SERVICE } from '@app/kafka';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

export interface FindAllQuery {
  page?: number;
  limit?: number;
  search?: string;
}

@Injectable()
export class TenantService {
  private readonly logger = new Logger(TenantService.name);

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    private readonly tenantDatabaseService: TenantDatabaseService,
    private readonly configService: ConfigService,
    @Inject(KAFKA_AUTH_SERVICE)
    private readonly authClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.authClient.subscribeToResponseOf(KafkaTopic.AUTH_REGISTER);
    await this.authClient.connect();
  }

  async create(dto: CreateTenantDto): Promise<Tenant> {
    const {
      name,
      slug,
      adminEmail,
      adminPassword,
      adminFirstName,
      adminLastName,
      domain,
      address,
      phone,
      plan,
    } = dto;

    this.logger.log(`Creating tenant slug=${slug}`);

    const existing = await this.tenantRepository.findOne({ where: { slug } });
    if (existing) {
      throw new ConflictException(
        `Tenant with slug '${slug}' already exists`,
      );
    }

    const dbHost = this.configService.get<string>('TENANT_DB_HOST', 'localhost');
    const dbPort = this.configService.get<number>('TENANT_DB_PORT', 3306);
    const dbUsername = this.configService.get<string>(
      'TENANT_DB_USERNAME',
      'root',
    );
    const dbPassword = this.configService.get<string>(
      'TENANT_DB_PASSWORD',
      '',
    );

    // Normalize slug for db name: replace hyphens with underscores
    const dbSafeName = slug.replace(/-/g, '_');
    const dbName = `school_${dbSafeName}`;

    const trialDays = this.configService.get<number>('TRIAL_DAYS', 14);
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + trialDays);

    const tenant = this.tenantRepository.create({
      name,
      slug,
      domain: domain ?? null,
      address: address ?? null,
      phone: phone ?? null,
      dbName,
      dbHost,
      dbPort,
      dbUsername,
      dbPassword,
      status: TenantStatus.TRIAL,
      plan: plan ?? SubscriptionPlan.FREE,
      trialEndsAt,
    });

    const savedTenant = await this.tenantRepository.save(tenant);
    this.logger.log(`Saved tenant to master DB: tenantId=${savedTenant.id}`);

    // Provision the tenant's dedicated database
    await this.tenantDatabaseService.provisionTenantDatabase(savedTenant);
    this.logger.log(`Provisioned database: ${dbName}`);

    // Create the school admin user in the tenant's database via Auth Service
    try {
      await firstValueFrom(
        this.authClient.send(KafkaTopic.AUTH_REGISTER, {
          firstName: adminFirstName,
          lastName: adminLastName,
          email: adminEmail,
          password: adminPassword,
          role: Role.SCHOOL_ADMIN,
          tenantSlug: slug,
        }),
      );
      this.logger.log(
        `School admin user created: email=${adminEmail} tenantSlug=${slug}`,
      );
    } catch (err) {
      this.logger.error(
        `Failed to create admin user for tenant ${slug}: ${err.message}`,
        err.stack,
      );
      // Tenant is created; surface error so caller is aware
      throw err;
    }

    return savedTenant;
  }

  async findAll(query: FindAllQuery): Promise<PaginatedResult<Tenant>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where = query.search
      ? [
          { name: Like(`%${query.search}%`) },
          { slug: Like(`%${query.search}%`) },
        ]
      : undefined;

    const [data, total] = await this.tenantRepository.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    if (!tenant) {
      throw new NotFoundException(`Tenant with id '${id}' not found`);
    }
    return tenant;
  }

  async update(id: string, dto: UpdateTenantDto): Promise<Tenant> {
    const tenant = await this.findOne(id);

    Object.assign(tenant, dto);

    const updated = await this.tenantRepository.save(tenant);
    this.logger.log(`Updated tenant id=${id}`);
    return updated;
  }

  async remove(id: string): Promise<Tenant> {
    const tenant = await this.findOne(id);

    tenant.status = TenantStatus.INACTIVE;
    const deactivated = await this.tenantRepository.save(tenant);

    this.logger.log(`Soft-deleted (deactivated) tenant id=${id}`);
    return deactivated;
  }
}
