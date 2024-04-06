import { createAction, props } from "@ngrx/store";

export const setZoom = createAction(
    '[Properties component] Change settings zoom',
    props<{payload: number}>()
)

export const setGrid = createAction(
    '[Properties component] Change settings grid',
    props<{payload: boolean}>()
)

export const setRepeat = createAction(
    '[Properties component] Change settings repeat',
    props<{payload: boolean}>()
)

export const selectLayer = createAction(
    '[List component] Select layer',
    props<{payload: number}>()
)

// export const addLayer = createAction(
//     '[Pattern effect] Add new layer',
//     props<{payload: string}>()
// )