import { createAction, props } from "@ngrx/store";
import { Positioning } from "../../models/pattern.model";
import { Layer } from "../../models/layer.model";
import { ColorStop, ColorStops } from "../../models/colorStop.model";

export const setBackgroundColor = createAction(
    '[Properties component] Change pattern background color',
    props<{payload: string}>()
)

export const setWidth = createAction(
    '[Properties component] Change pattern width',
    props<{payload: number}>()
)

export const setHeight = createAction(
    '[Properties component] Change pattern height',
    props<{payload: number}>()
)

export const setPositioning = createAction(
    '[Properties component] Change pattern positioning',
    props<{payload: Positioning}>()
)

export const addLinear = createAction(
    '[Buttons component] Add new linear layer',
    props<{payload: string}>()
)

export const addRadial = createAction(
    '[Buttons component] Add new radial layer',
    props<{payload: string}>()
)

export const toggleVisibility = createAction(
    '[List component] Toggle layer display',
    props<{payload: string}>()
)

export const toggleGrid = createAction(
    '[List component] Toggle grid display',
    props<{payload: string}>()
)

export const updateLayer = createAction(
    '[Properties Component] Update layer',
    props<{payload: Layer}>()
)

export const updateColorStops = createAction(
    '[Properties Component] Update color stops',
    props<{payload: ColorStops}>()
)