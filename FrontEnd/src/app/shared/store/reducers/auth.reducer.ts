import { Action, createReducer, on } from '@ngrx/store';
import { TokenDto, UserDto } from '../../sdk';
import { loginSuccess, logout, whoAmISuccess } from '../actions/auth.actions';


export const authFeatureKey = 'auth';

export interface AuthState {
  authenticated: boolean;
  token: TokenDto | undefined;
  loggedUser: UserDto | undefined;
  myUser?: UserDto;
}

export const initialState: AuthState = {
  authenticated: false,
  token: undefined,
  loggedUser: undefined,
  myUser: undefined,

};


export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { token }) => ({ ...state, token, authenticated: true })),
  on(logout, (state) => ({ ...state, authenticated: false })),
  on(whoAmISuccess, (state, { myUser }) => ({ ...state, myUser })),
);

