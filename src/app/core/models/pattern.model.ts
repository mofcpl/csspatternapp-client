import { EntityState } from "@ngrx/entity";
import { Layer } from "./layer.model";
import { ColorStop } from "./colorStop.model";

export enum Positioning {
    Relative = "%",
    Absolute = "px"
}

export interface IPattern {
    backgroundColor: string;
    width: number;
    height: number;
    positioning: Positioning;
    layers: EntityState<Layer>;
    colorStops: EntityState<ColorStop[]>;
    grid: boolean;
}

