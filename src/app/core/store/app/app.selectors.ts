import { createSelector } from "@ngrx/store";
import { ApplicationState } from "../../models/applicationState.model";

export const selectAppState = (state: {app: ApplicationState}) => state.app;

export const selectZoom = createSelector(selectAppState, (app: ApplicationState) => app.zoom);
export const selectRepeat = createSelector(selectAppState, (app: ApplicationState) => app.repeat);
export const selectSelectedIndex = createSelector(selectAppState, (app: ApplicationState) => app.selectedIndex);