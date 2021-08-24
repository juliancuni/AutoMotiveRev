import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { from, Observable } from 'rxjs';

@Injectable()
export class AuthService {

    async hashPass(pass: string): Promise<string> {
        return await bcrypt.hash(pass, 10);
    }

    async comparePass(plainTextPass: string, hashedPass: string): Promise<boolean> {
        return await bcrypt.compare(plainTextPass, hashedPass);
    }

}
