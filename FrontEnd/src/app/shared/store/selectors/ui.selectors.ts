import { createFeatureSelector, createSelector } from '@ngrx/store';
import { uiFeatureKey, UiState } from '../reducers/ui.reducer';

export const selectUiState = createFeatureSelector<UiState>(uiFeatureKey);

export const isLoading = createSelector(
    selectUiState,
    ui => !!ui.isLoading
)
