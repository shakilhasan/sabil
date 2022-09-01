import {ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {AuthGuard} from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    handleRequest(err, user, info: Error, context: ExecutionContext) {
        const myuser={...user, roles:[user?.roleAlias]}
        // user.roles=[user.roleAlias];
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        console.log(roles,"RolesGuard myuser----",myuser);

        if (!roles) {
            return true;
        }
        console.log(roles,"RolesGuard myuser----",myuser);

        const hasRole = () => myuser.roles.some((role) => roles.includes(role));
        // const hasRole = () => [myuser.roleAlias].some((role) => roles.includes(role));
        if (!myuser) {
            throw new UnauthorizedException();
        }
        if (!(myuser.roles && hasRole())) {
            throw new ForbiddenException('Forbidden');
        }
        return myuser && myuser.roles && hasRole();
        // return user && roles.some((role) => user.roleAlias===role);

    }
}
