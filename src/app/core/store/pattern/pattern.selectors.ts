import { createSelector } from "@ngrx/store";
import { IPattern } from "../../models/pattern.model";
import { colorStopsAdapter, layerAdapter } from "./pattern.reducer";

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

const selectColorStopsEntity = createSelector(getPattern, (state: IPattern) => state.colorStops)
const { selectAll: allColorStops } = colorStopsAdapter.getSelectors(selectColorStopsEntity)
export const selectAllColorStops = allColorStops

export const selectCompleteLayers = createSelector(getPattern, allLayers, allColorStops, (state, layers, colorStops) => {
    return {
        layers,
        colorStops
    }
})