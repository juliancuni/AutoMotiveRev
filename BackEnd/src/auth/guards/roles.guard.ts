<<<<<<< HEAD
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
=======
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
>>>>>>> backToNest
    }
}