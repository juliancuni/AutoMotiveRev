import { IsEmail } from 'class-validator';
import { RoleDto } from 'src/roles/dto/role.dto';

export class UserDto {

  id?: string;

  username: string;

  password: string;

  @IsEmail()
  email: string;

  docId?: string;

  emer?: string;

  mbiemer?: string;

  alias?: string;

  photo?: string;

  phone?: string;

  address?: string;

  roles?: RoleDto[];

}
