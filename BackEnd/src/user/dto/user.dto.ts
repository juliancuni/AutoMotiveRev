import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    username: string;
    @ApiProperty()
    @IsNotEmpty()
    password: string;
    @ApiProperty()
    @IsNotEmpty()
    email: string;
    @ApiProperty()
    emer: string;
    @ApiProperty()
    mbiemer: string;
}
