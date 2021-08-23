import { IsNotEmpty } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    email: string;
    emer: string;
    mbiemer: string;
}
