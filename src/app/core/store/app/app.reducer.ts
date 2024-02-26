import { createReducer, on } from "@ngrx/store";
import { ApplicationState, LayerSettings } from "../../models/applicationState.model";
import { createEntityAdapter } from "@ngrx/entity";
import { AppActions } from "../../action-types";

export const layerSettingsAdapter = createEntityAdapter<LayerSettings>();

const initialState: ApplicationState = {
    zoom: 0,
    grid: false,
    index: 0,
    repeat: false,
    selectedIndex: 0,
    layerSettings: layerSettingsAdapter.getInitialState()
}

export const appReducer = createReducer(
    initialState,
    on(AppActions.setGrid, (state, action) => {
        return {
            ...state,
            grid: action.payload
        }
    }),
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