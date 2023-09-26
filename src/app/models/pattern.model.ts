import { Linear } from "./linear.model";
import { Radial } from "./radial.model";

export interface Pattern {
    backgroundColor: string,
    width: number,
    height: number,
    zoom: number,
    code: string,
    grid: boolean,
    repeat: boolean,
    positioning: string,
    linears: Linear[],
    radials: Radial[],
    selected: {
        type: string,
        index: number
    }
}