import { createAction, props } from '@ngrx/store';
import { LoginUserDto, TokenDto, UserDto } from '../../sdk';

export const login = createAction(
  '[Login Page] Login',
  props<{ loginDto: LoginUserDto }>()
);

export const loginSuccess = createAction(
  '[Auth Effects] Login Success',
  props<{ token: TokenDto }>()
);

export const saveToLocalStorage = createAction(
  '[Auth Effects] Save Token',
  props<{ token: TokenDto }>()
);

export const logout = createAction(
  '[Header Component] Logout'
)

/** Who Am I */
export const whoAmI = createAction(
  '[Who Am I] User'
);

export const whoAmISuccess = createAction(
  '[Effect whoAmISuccess$] User Success',
  props<{ myUser: UserDto }>()
);

export const whoAmIFailure = createAction(
  '[Effect whoAmIFailure$] User Failure',
  props<{ error: any }>()
);
