import { Gradient } from "./gradient.model";
import { Layer } from "./layer.model";
import { IPattern, Positioning } from "./pattern.model";

export interface style {
    "background-image": string,
    "background-position": string,
    "background-color": string,
    "background-size": string,
    "background-repeat": string,
}

export interface RawPattern {
    backgroundColor: string;
    width: number;
    height: number;
    positioning: Positioning;
    layers: Layer[];
    gradients: Gradient[];
    grid: boolean;
}

export class ProjectData {
    id: number;
    author: number;
    title: string;
    publishDate: string;
    data: RawPattern;
    downloads: number;

    constructor( id:number, author: number, title: string, publishDate: string, data: string, downloads: number) {
        this.id = id
        this.author = author
        this.title = title
        this.publishDate = publishDate
        this.data = JSON.parse(data)
        this.downloads = downloads
    }
}

export interface ProjectDataResponse {
    id: number;
    author: number;
    title: string;
    publishDate: string;
    data: string;
    downloads: number;
}
