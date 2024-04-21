
export interface ColorStop {
    position: number;
    color: string;
    size: number;
    opacity: number;
    blur: number
}

export interface Gradient {
    name: string;
    stops: ColorStop[]
}