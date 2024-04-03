import { createSelector } from "@ngrx/store";
import { IPattern } from "../../models/pattern.model";
import { layerAdapter } from "./pattern.reducer";

export const selectPattern = (state: {pattern: IPattern}) => state.pattern;

export const selectBackgroundColor = createSelector(selectPattern, (state: IPattern) => state.backgroundColor);
export const selectWidth = createSelector(selectPattern, (state: IPattern) => state.width)
export const selectHeight = createSelector(selectPattern, (state: IPattern) => state.height)
export const selectPositioning = createSelector(selectPattern, (state: IPattern) => state.positioning)
export const selectMainGrid = createSelector(selectPattern, (state: IPattern) => state.grid)

const selectLayerEntity = createSelector(selectPattern, (state: IPattern) => state.layers)
const { selectTotal, selectAll} = layerAdapter.getSelectors(selectLayerEntity);
export const selectLayerCount = selectTotal;
export const selectAllLayers = selectAll;

