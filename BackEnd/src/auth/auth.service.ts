import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) {}

    async hashPass(pass: string): Promise<string> {
        return await bcrypt.hash(pass, 10);
    }

    async comparePass(plainTextPass: string, hashedPass: string): Promise<boolean> {
        return await bcrypt.compare(plainTextPass, hashedPass);
    }

    async generateJwt(payload: Object): Promise<string> {
        return await this.jwtService.signAsync({user: payload});
    }

}
