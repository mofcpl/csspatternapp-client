import { createReducer } from "@ngrx/store";

const initialState = {
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

export const patternReducer = createReducer(initialState);