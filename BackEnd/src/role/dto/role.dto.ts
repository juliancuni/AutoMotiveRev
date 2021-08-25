import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RoleDto {
    @ApiProperty()
    @IsNotEmpty()
    emri: string;

    @ApiProperty()
    pershkrimi?: string;
}
