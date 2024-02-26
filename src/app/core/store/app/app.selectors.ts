import { createSelector } from "@ngrx/store";
import { ApplicationState } from "../../models/applicationState.model";

export const selectAppState = (state: {app: ApplicationState}) => state.app;

export const selectZoom = createSelector(selectAppState, (app: ApplicationState) => app.zoom);
export const selectGrid = createSelector(selectAppState, (app: ApplicationState) => app.grid);
export const selectRepeat = createSelector(selectAppState, (app: ApplicationState) => app.repeat);


// grid$: Observable<boolean>;
// repeat$: Observable<boolean>;
// positioning$: Observable<Positioning>;
// zoom$: Observable<number>;