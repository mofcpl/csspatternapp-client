import { createAction, props } from "@ngrx/store";

export const setZoom = createAction(
    '[Properties] Change settings zoom',
    props<{payload: number}>()
)

export const setGrid = createAction(
    '[Properties] Change settings grid',
    props<{payload: boolean}>()
)

export const setRepeat = createAction(
    '[Properties] Change settings repeat',
    props<{payload: boolean}>()
)