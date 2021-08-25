import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Min } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class UserDto {

    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    // @Min(6, {message: 'Password duhet te jete me te pakten 6 karaktere'})
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    emer: string;

    @ApiProperty()
    mbiemer: string;

    @ApiProperty()
    role: UserRole
}
