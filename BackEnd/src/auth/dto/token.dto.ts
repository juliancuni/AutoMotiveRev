import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "src/users/dto/user.dto";

export class TokenDto {
    
    @ApiProperty()
    access_token: string;
}