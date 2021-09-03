import { createReducer } from "@ngrx/store";

export const uiFeatureKey = 'ui';

export interface UiState {
    userModal: any;
    confirmModal: any;
    toastr: any;
}

const initialUiState: UiState = {
    userModal: null,
    confirmModal: null,
    toastr: null,
}

export const uiReducer = createReducer(
    initialUiState,
)   