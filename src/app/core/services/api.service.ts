import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { IPattern } from "../models/pattern.model";
import { environment } from "src/environments/environment";
import { ProjectPreview, ProjectPreviewApiResponse } from "../models/projectPreview.model";
import { ProjectData, ProjectDataResponse } from "../models/projectData.model";

@Injectable({
    providedIn: 'root'
 })
export class ApiService {
    
    http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    getAllProjectsPreview(): Observable<ProjectPreview[]> {
        return this.http.get<ProjectPreviewApiResponse[]>(environment.api + "project").pipe(
            map( (result) => {
                const parsedResponse = result.map((value, index) => {
                    return new ProjectPreview(value.id, value.author, value.title, value.publishDate, value.style, value.downloads)
                })
                return parsedResponse
            })
        )
    }

    getProjectData(index: number): Observable<ProjectData> {
        return this.http.get<ProjectDataResponse>(environment.api + "project/" + index).pipe(
            map((result) => {
                return new ProjectData(result.id, result.author, result.title, result.publishDate, result.data, result.downloads)
            })
        )
    }

}