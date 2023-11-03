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

export interface Radius {
    position: number,
    color: string,
    size: number,
    opacity: number,
    blur: number
}

export interface Radial {
    shape: Shape,
    autoSize: boolean,
    width: number,
    height: number,
    size: Size,
    posx: number,
    posy: number,
    vertical: number,
    horizontal: number,
    visible: boolean,
    grid: boolean,
    rays: Radius[]
}