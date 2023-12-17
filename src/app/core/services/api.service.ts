import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { IMainProps, IPattern } from "../models/pattern.model";
import { environment } from "src/environments/environment";

export interface style {
    "background-image": string,
    "background-position": string,
    "background-color": string,
    "background-size": string,
    "background-repeat": string,
}

export class IProject {
    id: number;
    author: number;
    title: string;
    publishDate: string;
    data: IPattern;
    style: style;
    downloads: number;

    constructor( id:number, author: number, title: string, publishDate: string, data: string, style: string, downloads: number) {
        this.id = id
        this.author = author
        this.title = title
        this.publishDate = publishDate
        this.data = JSON.parse(data)
        this.style = JSON.parse(style)
        this.downloads = downloads
    }
}

export interface ProjectsResponse {
    id: number;
    author: number;
    title: string;
    publishDate: string;
    data: string;
    style: string;
    downloads: number;
}


@Injectable({
    providedIn: 'root'
 })
export class ApiService {
    
    http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    getAllProjects(): Observable<IProject[]> {
        return this.http.get<ProjectsResponse[]>(environment.api + "project").pipe(
            map( (result) => {
                const parsedResponse = result.map((value, index) => {
                    return new IProject(value.id, value.author, value.title, value.publishDate, value.data, value.style, value.downloads)
                })
                return parsedResponse
            })
        )
        
    }

}