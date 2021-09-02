import { UserDto } from "src/users/dto/user.dto";
import { FindManyOptions } from "typeorm";

export class FindOptionsDto {
    select?: string[];
    where?: {};
    relations?: string[];
}

