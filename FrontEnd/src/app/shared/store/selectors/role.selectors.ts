import { createFeatureSelector, createSelector } from '@ngrx/store';
import { roleFeatureKey, RoleState } from '../reducers/role.reducer';
import * as fromRoles from '../reducers/role.reducer';

export const selectRoleState = createFeatureSelector<RoleState>(roleFeatureKey);

export const selectAllRoles = createSelector(
    selectRoleState,
    fromRoles.selectAll
);