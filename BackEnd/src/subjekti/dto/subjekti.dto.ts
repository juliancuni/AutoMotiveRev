import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SubjektiDto {
    @ApiProperty()
    @IsNotEmpty()
    emer: string;
    @ApiProperty()
    telefon: string;
    @ApiProperty()
    adresa: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    @IsNotEmpty()
    nius: string;
}
