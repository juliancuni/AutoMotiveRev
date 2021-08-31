/* tslint:disable */
/* eslint-disable */
import { RoleDto } from './role-dto';
export interface UserDto {
  address: string;
  alias: string;
  docId: string;
  email: string;
  emer: string;
  mbiemer: string;
  password: string;
  phone: string;
  photo: string;
  roles: Array<RoleDto>;
  username: string;
}
