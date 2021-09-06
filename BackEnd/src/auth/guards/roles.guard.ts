import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserDto } from "src/users/dto/user.dto";
import { UsersService } from '../../users/users.service';
@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        // @Inject(forwardRef(() => UsersService)) private readonly _userService: UsersService,
        private readonly _userService: UsersService,
        private reflector: Reflector,
    ) { }

    async canActivate(ctx: ExecutionContext): Promise<boolean> {

        const requiredRoles = this.reflector.get<string[]>('roles', ctx.getHandler());
        const { user } = ctx.switchToHttp().getRequest();
        // console.log(ctx.getArgByIndex(1))
        // console.log(ctx.getClass())
        // console.log(ctx.getHandler())
        // console.log(ctx.getType())
        const userWithRoles: UserDto = await this._userService.findOne(user.userId, { relations: ['roles'] });
        if (!requiredRoles) return true;
        return requiredRoles.some((roleRequired) => userWithRoles.roles?.some((role) => role.role === roleRequired));
    }
}