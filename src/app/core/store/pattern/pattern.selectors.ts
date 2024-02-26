import { createSelector } from "@ngrx/store";
import { IPattern } from "../../models/pattern.model";

export const selectPattern = (state: {pattern: IPattern}) => state.pattern;

export const selectBackgroundColor = createSelector(selectPattern, (state: IPattern) => state.backgroundColor);
export const selectWidth = createSelector(selectPattern, (state: IPattern) => state.width)
export const selectHeight = createSelector(selectPattern, (state: IPattern) => state.height)
export const selectPositioning = createSelector(selectPattern, (state: IPattern) => state.positioning)


// backgroundColor$: Observable<string>;
// width$: Observable<number>;
// height$: Observable<number>;
// grid$: Observable<boolean>;
// repeat$: Observable<boolean>;
// positioning$: Observable<Positioning>;
// zoom$: Observable<number>;