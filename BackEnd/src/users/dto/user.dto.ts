import { Exclude, Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { RoleDto } from 'src/roles/dto/role.dto';

export class UserDto {

  @Expose()
  id?: string;

  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  docId?: string;

  @Expose()
  emer?: string;

  @Expose()
  mbiemer?: string;

  @Expose()
  alias?: string;

  @Expose()
  photo?: string;

  @Expose()
  phone?: string;

  @Expose()
  address?: string;

  @Expose()
  roles?: RoleDto[];

  isActive: boolean;

}
