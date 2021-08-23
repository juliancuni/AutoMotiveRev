import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    username: string;
    password: string;
    emer: string;
    mbiemer: string;
}
