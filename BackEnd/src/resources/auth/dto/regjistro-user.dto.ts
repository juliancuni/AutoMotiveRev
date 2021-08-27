import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Min } from "class-validator";
import { UserDto } from "src/resources/user/dto/user.dto";

export class RegjistroUserDto extends UserDto {
    @ApiProperty()
    @IsNotEmpty()
    @Min(6)
    password: string;
}