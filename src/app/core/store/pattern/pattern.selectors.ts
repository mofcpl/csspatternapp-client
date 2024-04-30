import { createSelector } from "@ngrx/store";
import { IPattern } from "../../models/pattern.model";
import { gradientsAdapter, layerAdapter } from "./pattern.reducer";

export const getPattern = (state: {pattern: IPattern}) => state.pattern;

export const selectBackgroundColor = createSelector(getPattern, (state: IPattern) => state.backgroundColor);
export const selectWidth = createSelector(getPattern, (state: IPattern) => state.width)
export const selectHeight = createSelector(getPattern, (state: IPattern) => state.height)
export const selectPositioning = createSelector(getPattern, (state: IPattern) => state.positioning)
export const selectMainGrid = createSelector(getPattern, (state: IPattern) => state.grid)

const selectLayerEntity = createSelector(getPattern, (state: IPattern) => state.layers)
const { selectTotal: totalLayers, selectAll: allLayers} = layerAdapter.getSelectors(selectLayerEntity);
export const selectLayerCount = totalLayers;
export const selectAllLayers = allLayers;

const selectGradientEntity = createSelector(getPattern, (state: IPattern) => state.gradients)
const { selectAll: allGradients } = gradientsAdapter.getSelectors(selectGradientEntity)
export const selectAllGradients = allGradients

export const selectCompleteLayers = createSelector(getPattern, allLayers, allGradients, (state, layers, gradients) => {
    return {
        layers,
        gradients
    }
})