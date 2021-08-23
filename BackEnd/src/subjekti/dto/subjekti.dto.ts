import { IsNotEmpty } from "class-validator";

export class SubjektiDto {
    @IsNotEmpty()
    emer: string;
    @IsNotEmpty()
    telefon: string;
    @IsNotEmpty()
    adresa: string;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    nius: string;
}
