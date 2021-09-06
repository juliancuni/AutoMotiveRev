import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiBody({ type: RegisterUserDto, description: 'New User From Public', required: true })
    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto): Promise<UserDto> {
        return this.authService.register(registerUserDto);
    }

    @ApiBody({ type: LoginUserDto, description: 'Login User', required: true })
    @Post('login')
    async login(@Body() loginDto: LoginUserDto): Promise<TokenDto> {
        return this.authService.login(loginDto);
    }

    @Post('logout')
    async logout() { }

}
