import { SubjektiEntity } from "src/subjekti/entities/subjekti.entity";

export interface IUser {
    id: string;
    username: string;
    password?: string;
    email: string;
    emer?: string;
    mbiemer?: string;
    subjekti?: SubjektiEntity;
}