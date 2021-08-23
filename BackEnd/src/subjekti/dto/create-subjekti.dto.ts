import { IsNotEmpty } from "class-validator";

export class CreateSubjektiDto {
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
