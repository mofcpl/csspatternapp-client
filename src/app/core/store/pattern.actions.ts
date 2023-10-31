import { createAction, props } from "@ngrx/store";
import { IMainProps, IPattern, Type } from "../models/pattern.model";
import { Line, Linear } from "../models/linear.model";
import { Radial, Radius } from "../models/radial.model";

export const setMainProp = createAction(
    '[Pattern] Set properties',
    props<{value: IMainProps}>()
)

export const setPattern = createAction(
    '[Pattern] Set pattern',
    props<{value: IPattern}>()
)

export const init = createAction(
    '[Pattern] Init'
)

export const addLinear = createAction(
    '[Pattern] Add linear'
)

export const addRadial = createAction(
    '[Pattern] Add radial'
)

export const clone = createAction(
    '[Pattern] clone'
)

export const select = createAction(
    '[Pattern] Select layer',
    props<{value: { type: Type, index: number }}>()
)

export const switchGrid = createAction(
    '[Pattern] Switch layer grid visibility',
    props<{value: { type: Type, index: number }}>()
)

export const switchVisibility = createAction(
    '[Pattern] Switch layer visibility',
    props<{value: { type: Type, index: number }}>()
)

export const updateLinear = createAction(
    '[Pattern] Update linear',
    props<{value: { linear: Linear, index: number}}>()
)

export const updateLine = createAction(
    '[Pattern] Update line',
    props<{value: {line: Line, linearIndex: number, lineIndex: number}}>()
)

export const updateRadial = createAction(
    '[Pattern] Update radial',
    props<{value: { radial: Radial, index: number}}>()
)

export const updateRadius = createAction(
    '[Pattern] Update radius',
    props<{value: {radius: Radius, radialIndex: number, radiusIndex: number}}>()
)

export const addLine = createAction(
    '[Pattern] Add line',
    props<{value: {linearIndex: number}}>()
)

export const addRadius = createAction(
    '[Pattern] Add radius',
    props<{value: {radialIndex: number}}>()
)

export const deleteLine = createAction(
    '[Pattern] Delete line',
    props<{value: {linearIndex: number, lineIndex: number}}>()
)

export const deleteRadius = createAction(
    '[Pattern] Delete radius',
    props<{value: {radialIndex: number, radiusIndex: number}}>()
)

