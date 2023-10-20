import { createReducer, on } from "@ngrx/store";
import { IPattern } from "../models/pattern.model";
import { setMainProp, setPattern} from "./pattern.actions";

export const initialState: IPattern = {
    backgroundColor: "#ffffff",
    width: 100,
    height: 100,
    zoom: 1.0,
    grid: true,
    repeat: true,
    positioning: "%",
    linears: [],
    radials: [],
}

export const patternReducer = createReducer(
    initialState,
    on(setMainProp, (state, action) => {
        return {
            ...state,
            ...action.value
        }
    }),
    on(setPattern, (state, action) => action.value)
);