import { EntityState } from "@ngrx/entity";

export interface Layer {
    autoSize: boolean;
    width: number;
    height: number;
    vertical: number;
    horizontal: number;

    visible: boolean;
    grid: boolean;
    name: string
}

export enum LayerType {
    Linear,
    Radial
}