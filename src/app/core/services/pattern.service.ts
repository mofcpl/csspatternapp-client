import { Injectable } from "@angular/core";
import { UtilsService } from "./util.service";
import { ColorStop, Gradient } from "../models/gradient.model";
import { Layer } from "../models/layer.model";
import { Positioning } from "../models/pattern.model";

@Injectable({
    providedIn: 'root'
})
export class PatternService {

    constructor(private utils: UtilsService) { }

    generateLayerCode(layer: Layer, colorStops: ColorStop[], positioning: Positioning, zoom: number, backgroundColor: string, width: number, height: number, grid: boolean) {
        const relativeWidth = (layer.autoSize == true) ? width : layer.width;
        const relativeHeight = (layer.autoSize == true) ? height : layer.height;
        
        return {
            image: this.generateImageCode(layer, colorStops, positioning, zoom),
            position: this.generatePositionCode(layer.vertical, layer.horizontal, zoom),
            visibility: this.generateVisibilityCode(layer.visible),
            gridCode: this.generateGridCode(relativeWidth, relativeHeight, backgroundColor, zoom, grid),
            size: this.generateSizeCode(relativeWidth, relativeHeight, zoom, layer.autoSize)
        }
    }

    generatePatternCode(layers: Layer[], gradients: Gradient[], positioning: Positioning, zoom: number, backgroundColor: string, width: number, height: number, repeat: boolean) {
        
        const imageCode = layers.map((layer, index) => {
            const currentLayerGradient = gradients.find((colorStop) =>  colorStop.name == layer.name)
            if (!currentLayerGradient) throw Error;
            return this.generateImageCode(layer, currentLayerGradient.stops, positioning, zoom);
        }).join(', ')

        const positionCode = layers.map((layer, index) => {
            return this.generatePositionCode(layer.vertical, layer.horizontal, zoom);
        }).join(', ')

        const sizeCode = layers.map((layer, index) => {
            const relativeWidth = (layer.autoSize == true) ? width : layer.width;
            const relativeHeight = (layer.autoSize == true) ? height : layer.height;
            return this.generateSizeCode(relativeWidth, relativeHeight, zoom, layer.autoSize);
        }).join(', ')
        
        const code = `background-image: ${imageCode}; \n`+
            `background-position: ${positionCode}; \n`+
            `background-color: ${backgroundColor}; \n`+
            `background-size: ${sizeCode}; \n`+
            `background-repeat: ${(repeat)? "repeat" : "no-repeat"};`

        return code;
            
    }
    
    generatePositionCode(vertical: number, horizontal: number, zoom: number): string {
        return (vertical * zoom) + "px " + (horizontal * zoom) + "px";
    }

    generateVisibilityCode(visible: boolean): string {
        return (visible == true) ? "visible" : "hidden";
    }

    generateSizeCode(width: number, height: number, zoom: number, autoSize: boolean): string {
        return width * zoom + "px " + height * zoom + "px";
    }

    generateImageCode(layer: Layer, colorStops: ColorStop[], positioning: Positioning, zoom: number): string {
        let backgroundImageCode = "";

        //Determine which type of object is layer
        if ('direction' in layer) {

            backgroundImageCode = "linear-gradient(" + layer['direction'] + "deg, ";

        } else {

            let posx = layer['posx'];
            let posy = layer['posy'];

            if (positioning == Positioning.Absolute) {
                posx *= zoom;
                posy *= zoom;
            }

            backgroundImageCode += "radial-gradient(" + layer['shape'] + " " + layer['size'] + " at " + posx + positioning + " " + posy + positioning + ", ";
        }

        backgroundImageCode += colorStops.map((element, index) => {
            const color = this.utils.hexToRgb(element.color);
            const rgbString = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", " + element.opacity / 100 + ")";

            let position = element.position;
            let size = element.size;

            if (positioning == Positioning.Absolute) {
                position *= zoom;
                size *= zoom;
            }

            const vacancyLeft = "transparent " + (position - 1 - element.blur) + positioning;
            const colorLeft = rgbString + " " + position + positioning;
            const colorRight = rgbString + " " + (position - 1 + size) + positioning;
            const vacancyRight = "transparent " + (position + size + element.blur) + positioning;

            return vacancyLeft + ", " + colorLeft + ", " + colorRight + ", " + vacancyRight;

        }).join(', ')
        
        backgroundImageCode += ")";

        return backgroundImageCode;
    }

    generateGridCode(width: number, height: number, backgroundColor: string, zoom: number, grid: boolean): string | null {
        return (grid)? this.prepareGridCode(width, height, backgroundColor, zoom): null;
    }

    prepareGridCode(width: number, height: number, color: string, zoom: number): string {
        const colorRGB = this.utils.hexToRgb(color);
        const gridColor = (colorRGB[0] + colorRGB[1] + colorRGB[2] < 382) ? "rgb(255,255,255)" : "rgb(0,0,0)";
        return "linear-gradient(90deg,transparent " + (width * zoom - 1) + "px, " + gridColor + " " + (width * zoom - 1) + "px, " + gridColor + " " + (width * zoom) + "px),"
            + "linear-gradient(180deg,transparent " + (height * zoom - 1) + "px, " + gridColor + " " + (height * zoom - 1) + "px, " + gridColor + " " + (height * zoom) + "px)";
    }
}