import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Min } from "class-validator";
import { RoleDto } from "src/role/dto/role.dto";

export class UserDto {

    @ApiProperty()
    id?: string;

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
    roles?: RoleDto[]
}
