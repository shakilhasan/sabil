import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const tenantId =
      request.headers['x-tenant-id'] ||
      this.extractFromSubdomain(request.headers['host']);

    if (!tenantId) {
      throw new UnauthorizedException('Tenant identifier is required');
    }
    request.tenantId = tenantId;
    return true;
  }

  private extractFromSubdomain(host: string): string | null {
    if (!host) return null;
    const parts = host.split('.');
    if (parts.length >= 3) return parts[0];
    return null;
  }
}
