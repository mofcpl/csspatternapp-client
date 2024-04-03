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

export const selectLayer = createAction(
    '[List] Select layer',
    props<{payload: number}>()
)

export const addLayer = createAction(
    '[Pattern effect] Add new layer',
    props<{payload: string}>()
)