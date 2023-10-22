import { createAction, props } from "@ngrx/store";
import { IMainProps, IPattern, Type } from "../models/pattern.model";
import { Linear } from "../models/linear.model";

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


//trzeba zrobić osobne story i wspólne selektory dla formularzy, formularz zostaje jeden