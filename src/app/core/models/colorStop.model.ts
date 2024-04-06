
export interface ColorStop {
    position: number;
    color: string;
    size: number;
    opacity: number;
    blur: number
}

export interface ColorStops {
    name: string;
    stops: ColorStop[]
}