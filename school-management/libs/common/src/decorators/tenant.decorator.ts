import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ITenantContext } from '../interfaces/tenant.interface';

export const TenantContext = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): ITenantContext => {
    const request = ctx.switchToHttp().getRequest();
    return request.tenantContext;
  },
);
