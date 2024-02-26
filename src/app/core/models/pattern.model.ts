import { EntityState } from "@ngrx/entity";
import { Layer } from "./layer.model";

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
}

