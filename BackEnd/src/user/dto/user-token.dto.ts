import { SubjektiEntity } from "src/subjekti/entities/subjekti.entity";
// import { IUser } from "../entities/user.interface";
import { UserDto } from "./user.dto";

export class UserTokenDto {
    id: string;
    username: string;
    password?: string;
    email: string;
    emer?: string;
    mbiemer?: string;
    subjekti?: SubjektiEntity;
    access_token: string;
}