import { createAction, props } from "@ngrx/store";
import { Positioning } from "../../models/pattern.model";

export const setBackgroundColor = createAction(
    '[Properties] Change pattern background color',
    props<{payload: string}>()
)

export const setWidth = createAction(
    '[Properties] Change pattern width',
    props<{payload: number}>()
)

export const setHeight = createAction(
    '[Properties] Change pattern height',
    props<{payload: number}>()
)

export const setPositioning = createAction(
    '[Properties] Change pattern positioning',
    props<{payload: Positioning}>()
)

export const addLinear = createAction(
    '[Buttons] Add new linear layer',
    props<{payload: string}>()
)

export const addRadial = createAction(
    '[Buttons] Add new radial layer',
    props<{payload: string}>()
)