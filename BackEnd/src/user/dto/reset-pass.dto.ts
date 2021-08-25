import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ResetTokenDto {
    @ApiProperty()
    @IsNotEmpty()
    token: string;
    @ApiProperty()
    @IsNotEmpty()
    newPassword: string;
}