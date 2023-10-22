export interface Line {
    position: number,
    color: string,
    size: number,
    opacity: number,
    blur: number
}

export interface Linear {
    direction: number,
    width: number,
    height: number,
    autoSize: boolean,
    vertical: number,
    horizontal: number,
    visible: boolean,
    grid: boolean,
    lines: Line[]
}