export enum Shape {
    Ellipse,
    Circle
}

export enum Size {
    FarthestCorner,
    ClosestSide,
    ClosestCorner,
    FarthestSide
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