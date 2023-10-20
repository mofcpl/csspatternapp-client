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
    grid: boolean,
    lines: Line[]
}