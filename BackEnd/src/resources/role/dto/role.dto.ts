import { ApiProperty } from "@nestjs/swagger";

export class RoleDto {

    @ApiProperty()
    id?: string

    @ApiProperty()
    roli: string;

    @ApiProperty()
    pershkrimi: string;

}
