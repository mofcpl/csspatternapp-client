import { createAction, props } from "@ngrx/store";
import { Pattern } from "../models/pattern.model";

export const setBackground = createAction(
    '[Pattern] Set background',
    props<{value: string}>()
)

export const init = createAction(
    '[Pattern] Init'
)

export const set = createAction(
    '[Counter] Set',
    props<{value: Pattern}>()
)