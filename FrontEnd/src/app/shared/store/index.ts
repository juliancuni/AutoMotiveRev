import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { environment } from '../../../environments/environment';
import { uiReducer, UiState } from './reducers/ui.reducer';
import { RouterState } from '@angular/router';
import { userReducer, UserState } from './reducers/user.reducer';
import { roleReducer, RoleState } from './reducers/role.reducer';

export interface AppState {
  router: RouterState,
  ui: UiState,
  users: UserState,
  roles: RoleState,
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  ui: uiReducer,
  users: userReducer,
  roles: roleReducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
