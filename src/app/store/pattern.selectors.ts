import { Pattern } from "../models/pattern.model";

export const selectPattern = (state: {pattern: Pattern}) => state.pattern;

export const selectBackgroundColor = (state: {pattern: Pattern}) => state.pattern.backgroundColor;