import { Action, createReducer, on } from '@ngrx/store';
import { TokenDto, UserDto } from '../../sdk';
import { loginFailure, loginSuccess, logout } from '../actions/auth.actions';


export const authFeatureKey = 'auth';

export interface AuthState {
  authenticated: boolean;
  token: TokenDto | undefined;
  loggedUser: UserDto | undefined;
}

export const initialState: AuthState = {
  authenticated: false,
  token: undefined,
  loggedUser: undefined,
};


export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { token }) => ({ ...state, token, authenticated: true })),
  on(loginFailure, (state, { error }) => ({ ...state, error, authenticated: false })),
  on(logout, (state) => ({ ...state, authenticated: false })),
);

