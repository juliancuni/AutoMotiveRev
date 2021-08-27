import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserDto } from "../../user/dto/user.dto";
import { AuthService } from "../auth.service";
import { LoginDto } from "../dto/login.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            usernameField: 'username'
        });
    }

    async validate(username: string, password: string): Promise<UserDto> {
        const loginDto: LoginDto = { username, password };
        return this.authService.login(loginDto);
    }
}