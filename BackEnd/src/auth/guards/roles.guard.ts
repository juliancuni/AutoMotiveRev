import { CanActivate, Injectable, ExecutionContext, Inject, forwardRef } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { IUser } from "src/user/entities/user.interface";
import { UserService } from "src/user/services/user.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) return true;

        const { user } = context.switchToHttp().getRequest();

        return this.userService.gjejNjeUserNgaId(user.id).then((userDb: IUser) => {
            return requiredRoles.some((role) => userDb.role?.includes(role));
        })
    }
}