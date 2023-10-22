import { Linear } from "./linear.model";
import { Radial } from "./radial.model";

export interface IProperties {
    backgroundColor: string,
    width: number,
    height: number,
    positioning: string,
}

export interface ISettings {
    zoom: number,
    grid: boolean,
    repeat: boolean,
    selected: {
        type: Type,
        index: number
    }
}

export enum Type {
    Linear,
    Radial,
    None
}

export interface IMainProps extends IProperties, ISettings { }

export interface IPattern extends IMainProps {
    linears: Linear[],
    radials: Radial[],
}