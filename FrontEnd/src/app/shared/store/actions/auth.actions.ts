import { createAction, props } from '@ngrx/store';
import { LoginUserDto, TokenDto } from '../../sdk';

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

export const loginFailure = createAction(
  '[Auth] Load Auths Failure',
  props<{ error: any }>()
);

export const logout = createAction(
  '[Header Component] Logout'
)
