import { createAction, props } from "@ngrx/store";
import { IMainProps, IPattern } from "../models/pattern.model";

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

//trzeba zrobić osobne story i wspólne selektory dla formularzy, formularz zostaje jeden