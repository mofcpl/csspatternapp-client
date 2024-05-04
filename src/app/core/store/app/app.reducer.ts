import { createReducer, on } from "@ngrx/store";
import { ApplicationState } from "../../models/applicationState.model";
import { AppActions } from "../../action-types";

const initialState: ApplicationState = {
    zoom: 1,
    repeat: false,
    selectedIndex: 0,
    projectIndex: null,
    user: null,
    loading: false,
    error: false
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
            repeat: !state.repeat
        }
    }),
    on(AppActions.selectLayer, (state, action) => {
        return {
            ...state,
            selectedIndex: action.payload
        }
    })
)