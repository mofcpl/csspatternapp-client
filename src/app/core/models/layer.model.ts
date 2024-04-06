import { EntityState } from "@ngrx/entity";

export interface Layer {
    [key: string]: any;
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

export enum LayerPropertyType {
    AutoSize,
    Width,
    Height,
    Vertical,
    Horizontal,
    Visible,
    Grid,
    Name,
    Direction,
    Shape,
    Size,
    PosX,
    PosY
}