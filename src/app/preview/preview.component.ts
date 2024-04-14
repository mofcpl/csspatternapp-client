import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { ApplicationState } from '../core/models/applicationState.model';
import { IPattern, Positioning } from '../core/models/pattern.model';
import { selectRepeat, selectZoom } from '../core/store/app/app.selectors';
import { selectAllColorStops, selectAllLayers, selectBackgroundColor, selectCompleteLayers, selectHeight, selectMainGrid, selectPositioning, selectWidth } from '../core/store/pattern/pattern.selectors';
import { Layer } from '../core/models/layer.model';
import { UtilsService } from '../core/services/util.service';
import { ColorStop, ColorStops } from '../core/models/colorStop.model';

interface Preview {
  image: string,
  position: string,
  visibility: string,
  gridCode: string | null,
  size: string
}

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {

  zoom$: Observable<number>;
  repeat$: Observable<boolean>

  width$: Observable<number>;
  height$: Observable<number>;
  backgroundColor$: Observable<string>;
  positioning$: Observable<Positioning>;
  grid$: Observable<boolean>;
  completeLayers$: Observable<{layers: Layer[], colorStops: ColorStops[]}>;

  gridStyle$: Observable<{
    backgroundImage: string,
    backgroundSize: string
  }>

  previewLayer$: Observable<Preview[]>;

  constructor(private store: Store<{ app: ApplicationState, pattern: IPattern }>, private utils: UtilsService) {
    this.zoom$ = this.store.select(selectZoom);
    this.repeat$ = this.store.select(selectRepeat);

    this.width$ = this.store.select(selectWidth);
    this.height$ = this.store.select(selectHeight);
    this.backgroundColor$ = this.store.select(selectBackgroundColor);
    this.positioning$ = this.store.select(selectPositioning);
    this.grid$ = this.store.select(selectMainGrid);
    this.completeLayers$ = this.store.select(selectCompleteLayers);

    this.gridStyle$ = combineLatest([this.width$, this.height$, this.backgroundColor$, this.zoom$]).pipe(
      map(([width, height, backgroundColor, zoom]) => {
        const backgroundImage = this.drawGrid(width, height, backgroundColor, zoom);
        const backgroundSize = (width * zoom) + "px " + (height * zoom) + "px";
        return { backgroundImage, backgroundSize }
      })
    )

    this.previewLayer$ = combineLatest([this.completeLayers$, this.width$, this.height$, this.backgroundColor$, this.positioning$, this.repeat$, this.zoom$]).pipe(
      map(([completeLayers, width, height, backgroundColor, positioning, repeat, zoom]) => {
        return completeLayers.layers.map((layer) => {
          const currentLayerColorStops = completeLayers.colorStops.find((element) => {
            return element.name == layer.name
          })
          if (!currentLayerColorStops) throw Error;
          return this.prepareLayer(layer, currentLayerColorStops.stops, width, height, backgroundColor, positioning, repeat, zoom);
        })
      }
      ))
  }

  prepareLayer(layer: Layer, colorStop: ColorStop[], width: number, height: number, backgroundColor: string, positioning: Positioning, repeat: boolean, zoom: number): Preview {

    let backgroundImageCode = "";

    //Determine which type of object is layer
    if ('direction' in layer) {
      
      backgroundImageCode = "linear-gradient(" + layer['direction'] + "deg, ";
    
    } else {
      
      let posx = layer['posx'];
      let posy = layer['posy'];
      
      if(positioning == Positioning.Absolute) {
        posx *= zoom;
        posy *= zoom;
      }
      
      backgroundImageCode += "radial-gradient(" + layer['shape'] + " " + layer['size'] + " at " + posx + positioning + " " + posy + positioning + ", ";
    }

    colorStop.map((element, index) => {
      const color = this.utils.hexToRgb(element.color);
      const rgbString = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", " + element.opacity / 100 + ")";

      let position = element.position;
      let size = element.size;
      
      if(positioning = Positioning.Absolute) {
        position *= zoom;
        size *= zoom;
      }

      const vacancyLeft = "transparent " + (position - 1 - element.blur) + positioning;
      const colorLeft = rgbString + " " + position + positioning;
      const colorRight = rgbString + " " + (position - 1 + size) + positioning;
      const vacancyRight = "transparent " + (position + size + element.blur) + positioning;

      backgroundImageCode += vacancyLeft + ", " + colorLeft + ", " + colorRight + ", " + vacancyRight;
      
      backgroundImageCode += (index < (colorStop.length - 1)) ? ", " : ") ";

    })

    const autoWidth = width * zoom;
    const autoHeight = height * zoom;
    const manualWidth = layer.width * zoom;
    const manualHeight = layer.height * zoom;

    const relativeWidth = (layer.autoSize == true) ? autoWidth : manualWidth;
    const relativeHeight = (layer.autoSize == true) ? autoHeight : manualHeight;

    let backgroundPosCode = (layer.vertical * zoom) + "px " + (layer.horizontal * zoom) + "px";
    let backgroundWidthCode = relativeWidth;
    let backgroundHeightCode = relativeHeight;
    let backgroundSizeCode = backgroundWidthCode + "px " + backgroundHeightCode + "px ";

    const visibility = (layer.visible == true) ? "visible" : "hidden";
    const grid = (layer.grid)? this.drawGrid(width, height, backgroundColor, zoom): null;

    return {
      image: backgroundImageCode,
      position: backgroundPosCode,
      visibility: visibility,
      gridCode: grid,
      size: backgroundSizeCode
    }

  }

  drawGrid(width: number, height: number, color: string, zoom: number): string {
    const colorRGB = this.utils.hexToRgb(color);
    const gridColor = (colorRGB[0] + colorRGB[1] + colorRGB[2] < 382) ? "rgb(255,255,255)" : "rgb(0,0,0)";
    return "linear-gradient(90deg,transparent " + (width * zoom - 1) + "px, " + gridColor + " " + (width * zoom - 1) + "px, " + gridColor + " " + (width * zoom) + "px),"
      + "linear-gradient(180deg,transparent " + (height * zoom - 1) + "px, " + gridColor + " " + (height * zoom - 1) + "px, " + gridColor + " " + (height * zoom) + "px)";
  }
}
