import { CanActivate, Injectable, ExecutionContext, Inject, forwardRef } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserDto } from "src/user/dto/user.dto";
import { UserService } from "src/user/services/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) return true;
        const { user } = context.switchToHttp().getRequest();
        return await this.userService.gjejNjeUserNgaId(user.id).then((userDb: UserDto) => {
            const isAuthorized = userDb.roles.some((r) => requiredRoles.includes(r.emri));
            return isAuthorized;
        })
    }
}