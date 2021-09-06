import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { environment } from '../../../environments/environment';
import { uiReducer, UiState } from './reducers/ui.reducer';
import { RouterState } from '@angular/router';
import { userReducer, UserState } from './reducers/user.reducer';
import { roleReducer, RoleState } from './reducers/role.reducer';
import { authReducer, AuthState } from './reducers/auth.reducer';

export interface AppState {
  router: RouterState,
  ui: UiState,
  users: UserState,
  roles: RoleState,
  auth: AuthState,
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  ui: uiReducer,
  users: userReducer,
  roles: roleReducer,
  auth: authReducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
