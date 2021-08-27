import { UserDto } from "../../user/dto/user.dto";
import { Request } from 'express';

export default interface ReqWithUser extends Request {
    user: UserDto;
}