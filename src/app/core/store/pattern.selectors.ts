import { createSelector } from "@ngrx/store";
import { IPattern, IProperties, ISettings, Type} from "../models/pattern.model";
import { Radial } from "../models/radial.model";
import { Linear } from "../models/linear.model";

export const selectBackgroundColor = (state: {pattern: IPattern}) => state.pattern.backgroundColor;

export const selectZoom = (state: {pattern: IPattern}) => state.pattern.zoom;

export const selectGrid = (state: {pattern: IPattern}) => state.pattern.grid;

export const selectRadials = (state: {pattern: IPattern}) => state.pattern.radials;

export const selectLinears = (state: {pattern: IPattern}) => state.pattern.linears;

export const selectSelected = (state: {pattern: IPattern}) => state.pattern.selected;

export const selectPattern = (state: {pattern: IPattern}) => state.pattern;

export const selectPatternSize = (state: {pattern: IPattern}) => {
    return { 
        width: state.pattern.width,
        height: state.pattern.height
    }
}

export const selectProperties = (state: {pattern: IPattern}) => {
    const {
        ...IProperties
    } = state.pattern;
    return { ...IProperties }
}

export const selectSettings = (state: {pattern: IPattern}) => {
    const {
        ...ISettings
    } = state.pattern;
    return { ...ISettings }
}

export const selectMainProps = createSelector(
    selectProperties,
    selectSettings,
    (properties: IProperties, settings: ISettings) => {
        return { ...properties, ...settings}
    }
)

export const selectPropsForGrid = createSelector(
    selectBackgroundColor,
    selectZoom,
    selectPatternSize,
    (backgroundColor: string, zoom: number, size: {width: number, height: number}) => {
        return {backgroundColor, zoom, size}
    }
)

export const selectList = createSelector(
    selectRadials,
    selectLinears,
    selectSelected,
    (radials: Radial[], linears: Linear[], selected: {type: Type, index: number}) => {
        return {radials, linears, selected}
    }
)