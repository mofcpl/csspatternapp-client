export interface Ray {
    position: number,
    color: string,
    size: number,
    opacity: number,
    blur: number
}

export interface Radial {
    shape: string,
    autoSize: boolean,
    size: string,
    posx: number,
    posy: number,
    vertical: number,
    horizontal: number,
    visible: boolean,
    grid: boolean,
    rays: Ray[]
}