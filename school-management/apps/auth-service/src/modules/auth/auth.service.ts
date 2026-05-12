import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { TenantDatabaseService } from '@app/database';
import { Role, IJwtPayload } from '@app/common';
import { User } from '../user/entities/user.entity';

export interface LoginPayload {
  email: string;
  password: string;
  tenantSlug: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: Role;
  tenantSlug: string;
}

export interface AuthResponse {
  accessToken: string;
  user: Omit<User, 'password'>;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly tenantDatabaseService: TenantDatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { email, password, tenantSlug } = payload;

    this.logger.log(`Login attempt for email=${email} tenantSlug=${tenantSlug}`);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [User],
    );

    const tenant = await this.tenantDatabaseService['tenantRepository'].findOne({
      where: { slug: tenantSlug },
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant '${tenantSlug}' not found`);
    }

    const userRepository = dataSource.getRepository(User);

    const user = await userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwtPayload: IJwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: tenant.id,
      tenantSlug: tenant.slug,
      dbName: tenant.dbName,
    };

    const accessToken = this.jwtService.sign(jwtPayload);

    const { password: _password, ...userWithoutPassword } = user;

    this.logger.log(`Login successful for userId=${user.id}`);

    return {
      accessToken,
      user: userWithoutPassword as Omit<User, 'password'>,
    };
  }

  async register(payload: RegisterPayload): Promise<Omit<User, 'password'>> {
    const { firstName, lastName, email, password, role, tenantSlug } = payload;

    this.logger.log(
      `Register attempt for email=${email} tenantSlug=${tenantSlug}`,
    );

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [User],
    );

    const tenant = await this.tenantDatabaseService['tenantRepository'].findOne({
      where: { slug: tenantSlug },
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant '${tenantSlug}' not found`);
    }

    const userRepository = dataSource.getRepository(User);

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException(
        `User with email '${email}' already exists in this tenant`,
      );
    }

    const saltRounds = parseInt(
      this.configService.get<string>('BCRYPT_SALT_ROUNDS', '10'),
      10,
    );
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role ?? Role.STUDENT,
      tenantId: tenant.id,
      isActive: true,
    });

    const savedUser = await userRepository.save(newUser);

    const { password: _password, ...userWithoutPassword } = savedUser;

    this.logger.log(
      `Registered new user userId=${savedUser.id} tenantSlug=${tenantSlug}`,
    );

    return userWithoutPassword as Omit<User, 'password'>;
  }
}
