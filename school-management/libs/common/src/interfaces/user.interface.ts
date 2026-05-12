import { Role } from '../enums/roles.enum';

export interface IJwtPayload {
  sub: string;
  email: string;
  role: Role;
  tenantId: string;
  tenantSlug: string;
  dbName: string;
}

export interface IAuthUser {
  id: string;
  email: string;
  role: Role;
  tenantId: string;
  tenantSlug: string;
  dbName: string;
}
