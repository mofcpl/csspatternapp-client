import { createSelector } from "@ngrx/store";
import { IPattern, IProperties, ISettings} from "../models/pattern.model";

export const selectPattern = (state: {pattern: IPattern}) => state.pattern;

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