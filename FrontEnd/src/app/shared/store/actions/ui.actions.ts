import { createAction, props } from "@ngrx/store";

const showConfirmModal = createAction(
    '[Show ConfirmModal] showConfirmModal',
    props<{ mesage: any }>()
)

const loading = createAction(
    '[Loading] App Loading',
    props<{ isLoading: boolean }>()
)