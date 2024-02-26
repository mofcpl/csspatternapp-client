import { Layer } from "./layer.model";

export enum Shape {
    Ellipse = "ellipse",
    Circle = "circle"
}

export enum Size {
    FarthestCorner = "farthest-corner",
    ClosestSide = "closest-side",
    ClosestCorner = "closest-corner",
    FarthestSide = "farthest-side"
}

export interface Radial extends Layer {
    shape: Shape;
    size: Size;
    posx: number;
    posy: number;
}