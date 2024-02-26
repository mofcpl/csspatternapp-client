import { EntityState } from "@ngrx/entity";

export interface ColorStops {
    position: number;
    color: string;
    size: number;
    opacity: number;
    blur: number
}

export interface Layer {
    autoSize: boolean;
    width: number;
    height: number;
    vertical: number;
    horizontal: number;
    stops: EntityState<ColorStops>;
}