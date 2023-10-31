import { Injectable } from "@angular/core";
import { ISelected } from "../core/models/pattern.model";
import { Line, Linear } from "../core/models/linear.model";
import { Subject } from "rxjs";
import { Radial, Radius } from "../core/models/radial.model";

@Injectable({providedIn: 'root'})
export class PropertiesService {
    linearChanges = new Subject<{linear: Linear, index: number}>;
    lineChanges = new Subject<{line: Line, linearIndex: number, lineIndex: number}>;
    radialChanges = new Subject<{radial: Radial, index: number}>;
    radiusChanges = new Subject<{radius: Radius, radialIndex: number, radiusIndex: number}>;

    addLine = new Subject<{linearIndex: number}>;
    deleteLine = new Subject<{linearIndex: number, lineIndex: number}>;
    addRadius = new Subject<{radialIndex: number}>;
    deleteRadius = new Subject<{radialIndex: number, radiusIndex: number}>;
}