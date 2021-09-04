import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UsersService } from '../../users/users.service';
@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        @Inject(forwardRef(() => UsersService)) private userService: UsersService,
        private reflector: Reflector,
    ) { }

    canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const requiredRoles = this.reflector.get<string[]>('roles', ctx.getHandler());
        const { user } = ctx.switchToHttp().getRequest();
        console.log(ctx.getArgByIndex(1))
        // console.log(ctx.getClass())
        // console.log(ctx.getHandler())
        // console.log(ctx.getType())

        if (!requiredRoles) return true;
        return true;
    }
}