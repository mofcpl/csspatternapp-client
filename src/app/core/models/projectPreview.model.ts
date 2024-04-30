export interface style {
    "background-image": string,
    "background-position": string,
    "background-color": string,
    "background-size": string,
    "background-repeat": string,
}

export class ProjectPreview {
    id: number;
    author: number;
    title: string;
    publishDate: string;
    style: style;
    downloads: number;

    constructor( id:number, author: number, title: string, publishDate: string, style: string, downloads: number) {
        this.id = id
        this.author = author
        this.title = title
        this.publishDate = publishDate
        this.style = JSON.parse(style)
        this.downloads = downloads
    }
}

export interface ProjectPreviewApiResponse {
    id: number;
    author: number;
    title: string;
    publishDate: string;
    style: string;
    downloads: number;
}