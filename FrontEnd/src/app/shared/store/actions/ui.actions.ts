import { createAction, props } from "@ngrx/store";

export const showConfirmModal = createAction(
    '[Show ConfirmModal] showConfirmModal',
    props<{ mesage: any }>()
)

export const loading = createAction(
    '[Loading] App Loading',
    props<{ isLoading: boolean }>()
)
/** Toastr notifications */
export const toastrError = createAction(
    '[Toastr Error] show error',
    props<{ error: any }>()
)

export  const toastrWarning = createAction(
    '[Toastr Waning] show warning',
    props<{ msg: any }>()
)

export const toastrSuccess = createAction(
    '[Toastr Success] show success',
    props<{ msg: any }>()
)