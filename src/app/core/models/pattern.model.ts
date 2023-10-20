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
}

export interface IMainProps extends IProperties, ISettings {}


export interface IPattern extends IMainProps {
    //pattern
    linears: Linear[],
    radials: Radial[],
}