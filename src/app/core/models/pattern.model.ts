import { Linear } from "./linear.model";
import { Radial } from "./radial.model";

export interface IProperties {
    backgroundColor: string,
    width: number,
    height: number,
    positioning: string,
}

export interface ISelected {
    type: Type,
    index: number
}

export interface ISettings {
    zoom: number,
    grid: boolean,
    repeat: boolean,
    selected: ISelected
}

export interface IManagement {
    id: number | null,
    isLoading: boolean,
    errors: publishError | null,
    success: boolean
}

export enum Type {
    Linear,
    Radial,
    None
}

export interface publishError {
    title: string | null,
    data: string | null,
    style: string | null
}

export interface IMainProps extends IProperties, ISettings { }

export interface IPattern extends IMainProps, IManagement {
    linears: Linear[],
    radials: Radial[]
}