import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    username: string;
    @ApiProperty()
    @IsNotEmpty()
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
