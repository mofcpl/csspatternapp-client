import { createReducer, on } from "@ngrx/store";
import { ApplicationState } from "../../models/applicationState.model";
import { AppActions } from "../../action-types";

const initialState: ApplicationState = {
    zoom: 0,
    repeat: false,
    selectedIndex: 0,
}

export const appReducer = createReducer(
    initialState,
    on(AppActions.setZoom, (state, action) => {
        return {
            ...state,
            zoom: action.payload
        }
    }),
    on(AppActions.setRepeat, (state, action) => {
        return {
            ...state,
            repeat: action.payload
        }
    })
)