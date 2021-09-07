import { ApiProperty } from "@nestjs/swagger";

export class SubjektiDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    nius: string;

    @ApiProperty()
    adresa: string;

    @ApiProperty()
    telefon: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    slogan: string;

    @ApiProperty()
    logo: string;

}
