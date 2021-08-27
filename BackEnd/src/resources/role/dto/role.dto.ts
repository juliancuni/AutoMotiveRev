import { ApiProperty } from "@nestjs/swagger";

export class RoleDto {

    @ApiProperty()
    roli: string;

    @ApiProperty()
    pershkrimi: string;
    
}
