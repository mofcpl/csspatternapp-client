import { createReducer, on } from "@ngrx/store";
import { set, setBackground } from "./pattern.actions";
import { Pattern } from "../models/pattern.model";

export const initialState: Pattern = {
    backgroundColor: "#ffffff",
    width: 100,
    height: 100,
    zoom: 1.0,
    code: "press button to generate...",
    grid: true,
    repeat: true,
    positioning: "%",
    linears: [],
    radials: [],
    selected:
    {
        type: "none",
        index: 0
    }
}

export const patternReducer = createReducer(
    initialState,
    on(setBackground, (state, action) => {
        return {
            ...state,
            backgroundColor: action.value
        }
    }),
    on(set, (state, action) => action.value)
);