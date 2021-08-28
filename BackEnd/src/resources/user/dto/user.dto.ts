import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { RoleDto } from "src/resources/role/dto/role.dto";

export class UserDto {

    @ApiProperty()
    id?: string;

    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    emer: string;

    @ApiProperty()
    mbiemer: string;

    @ApiProperty()
    rolet: RoleDto[];

}
