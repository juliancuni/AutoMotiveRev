import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userFeatureKey, UserState } from '../reducers/user.reducer';
import * as fromUsers from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

export const selectAllUsers = createSelector(
    selectUserState,
    fromUsers.selectAll
);