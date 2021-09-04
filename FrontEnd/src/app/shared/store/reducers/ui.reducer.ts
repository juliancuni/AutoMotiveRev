import { createReducer } from "@ngrx/store";

export const uiFeatureKey = 'ui';

export interface UiState {
    userModal: any;
    confirmModal: any;
    toastr: any;
    isLoading: boolean;
}

const initialUiState: UiState = {
    userModal: null,
    confirmModal: null,
    toastr: null,
    isLoading: false,
}

export const uiReducer = createReducer(
    initialUiState,
)   