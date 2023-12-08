import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMainProps, IPattern, Type } from '../core/models/pattern.model';
import { selectBackgroundColor, selectGrid, selectLinears, selectMainProps, selectPropsForGrid, selectRadials } from '../core/store/pattern/pattern.selectors';
import { Observable, combineLatest, map } from 'rxjs';
import { Linear } from '../core/models/linear.model';
import { Radial, Shape, Size } from '../core/models/radial.model';
import { IPreview } from './preview.model';
import { UtilsService } from '../core/services/util.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {
  backgroundColor$: Observable<string>;
  gridStyle$: Observable<{
    backgroundImage: string,
    backgroundSize: string
  }>;
  grid$: Observable<boolean>;

  previewLinears$: Observable<IPreview[]>;
  previewRadials$: Observable<IPreview[]>;

  constructor(private service: UtilsService, private store: Store<{ pattern: IPattern }>) {

    this.backgroundColor$ = store.select(selectBackgroundColor);

    this.gridStyle$ = store.select(selectPropsForGrid).pipe(
      map((data) => {

        const backgroundImage = this.drawGrid(data.size.width, data.size.height, data.backgroundColor, data.zoom);
        const backgroundSize = (data.size.width * data.zoom) + "px " + (data.size.height * data.zoom) + "px";
        return { backgroundImage, backgroundSize }
      })
    )

    this.grid$ = store.select(selectGrid);

    this.previewLinears$ = combineLatest([store.select(selectLinears), store.select(selectMainProps)]).pipe(
      map(([linears, props]) => {
        return linears.map((element) => {
          return this.prepareLinear(element, props)
        })
      })
    );

    this.previewRadials$ = combineLatest([store.select(selectRadials), store.select(selectMainProps)]).pipe(
      map(([radials, props]) => {
        return radials.map((element) => {
          return this.prepareRadial(element, props)
        })
      })
    );

  }

  prepareLinear(linear: Linear, props: IMainProps): IPreview {
    let backgroundImageCode = "";


    backgroundImageCode = "linear-gradient(" + linear.direction + "deg, ";
    linear.lines.map((line, lineIndex) => {
      const colorArray = this.service.hexToRgb(line.color);
      const rgbString = "rgba(" + colorArray[0] + ", " + colorArray[1] + ", " + colorArray[2] + ", " + line.opacity / 100 + ")";

      const posType = props.positioning;
      if (props.positioning == "%") {
        const vacancyLeft = "transparent " + (line.position - line.blur) + posType;
        const colorLeft = rgbString + " " + line.position + posType;
        const colorRight = rgbString + " " + (line.position + line.size) + posType;
        const vacancyRight = "transparent " + (line.position + line.size + line.blur) + posType;

        backgroundImageCode += vacancyLeft + ", " + colorLeft + ", " + colorRight + ", " + vacancyRight;
      }
      else if (props.positioning == "px") {
        const position = line.position * props.zoom;
        const size = line.size * props.zoom;

        const vacancyLeft = "transparent " + (position - line.blur) + posType;
        const colorLeft = rgbString + " " + position + posType;
        const colorRight = rgbString + " " + (position + size) + posType;
        const vacancyRight = "transparent " + (position + size + line.blur) + posType;

        backgroundImageCode += vacancyLeft + ", " + colorLeft + ", " + colorRight + ", " + vacancyRight;
      }
      backgroundImageCode += (lineIndex < (linear.lines.length - 1)) ? ", " : ") ";

    })

    const autoWidth = props.width * props.zoom;
    const autoHeight = props.height * props.zoom;
    const width = linear.width * props.zoom;
    const height = linear.height * props.zoom;

    const relativeWidth = (linear.autoSize == true) ? autoWidth : width;
    const relativeHeight = (linear.autoSize == true) ? autoHeight : height;

    let backgroundPosCode = (linear.vertical * props.zoom) + "px " + (linear.horizontal * props.zoom) + "px";
    let backgroundWidthCode = relativeWidth;
    let backgroundHeightCode = relativeHeight;
    let backgroundSizeCode = backgroundWidthCode + "px " + backgroundHeightCode + "px "

    const visibility = (linear.visible == true) ? "visible" : "hidden";
    const grid = (linear.grid)? this.drawGrid(props.width, props.height, props.backgroundColor, props.zoom): null;

    return {
      image: backgroundImageCode,
      position: backgroundPosCode,
      visibility: visibility,
      gridCode: grid,
      size: backgroundSizeCode
    }

  }

  prepareRadial(radial: Radial, props: IMainProps): IPreview {
    let backgroundImageCode = "";
    const posType = props.positioning;

    if (props.positioning == "%") {
      backgroundImageCode += "radial-gradient(" + radial.shape + " " + radial.size + " at " + radial.posx + posType + " " + radial.posy + posType + ", ";
    }
    else if (props.positioning == "px") {
      const posx = radial.posx * props.zoom;
      const posy = radial.posy * props.zoom;
      backgroundImageCode += "radial-gradient(" + radial.shape + " " + radial.size + " at " + posx + posType + " " + posy + posType + ", ";
    }

    radial.rays.map((radius, radiusIndex) => {
      const color = this.service.hexToRgb(radius.color);
      const rgbString = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", " + radius.opacity / 100 + ")";


      if (props.positioning == "%") {
        const vacancyLeft = "transparent " + (radius.position - 1 - radius.blur) + posType;
        const colorLeft = rgbString + " " + radius.position + posType;
        const colorRight = rgbString + " " + (radius.position - 1 + radius.size) + posType;
        const vacancyRight = "transparent " + (radius.position + radius.size + radius.blur) + posType;

        backgroundImageCode += vacancyLeft + ", " + colorLeft + ", " + colorRight + ", " + vacancyRight;
      }
      else if (props.positioning == "px") {
        const position = radius.position * props.zoom;
        const size = radius.size * props.zoom;

        const vacancyLeft = "transparent " + (position - 1 - radius.blur) + posType;
        const colorLeft = rgbString + " " + position + posType;
        const colorRight = rgbString + " " + (position - 1 + size) + posType;
        const vacancyRight = "transparent " + (position + size + radius.blur) + posType;

        backgroundImageCode += vacancyLeft + ", " + colorLeft + ", " + colorRight + ", " + vacancyRight;
      }
      if (radiusIndex < (radial.rays.length - 1)) {
        backgroundImageCode += ", ";
      }
      else {
        backgroundImageCode += ") ";
      }

    })

    const autoWidth = props.width * props.zoom;
    const autoHeight = props.height * props.zoom;
    const width = radial.width * props.zoom;
    const height = radial.height * props.zoom;

    const relativeWidth = (radial.autoSize == true) ? autoWidth : width;
    const relativeHeight = (radial.autoSize == true) ? autoHeight : height;

    let backgroundPosCode = (radial.vertical * props.zoom) + "px " + (radial.horizontal * props.zoom) + "px";
    let backgroundWidthCode = relativeWidth;
    let backgroundHeightCode = relativeHeight;
    let backgroundSizeCode = backgroundWidthCode + "px " + backgroundHeightCode + "px "

    const visibility = (radial.visible == true) ? "visible" : "hidden";
    const grid = (radial.grid)? this.drawGrid(props.width, props.height, props.backgroundColor, props.zoom): null;

    return {
      image: backgroundImageCode,
      position: backgroundPosCode,
      visibility: visibility,
      gridCode: grid,
      size: backgroundSizeCode
    }
  }

  drawGrid(width: number, height: number, color: string, zoom: number): string {
    const colorRGB = this.service.hexToRgb(color);
    const gridColor = (colorRGB[0] + colorRGB[1] + colorRGB[2] < 382) ? "rgb(255,255,255)" : "rgb(0,0,0)";
    return "linear-gradient(90deg,transparent " + (width * zoom - 1) + "px, " + gridColor + " " + (width * zoom - 1) + "px, " + gridColor + " " + (width * zoom) + "px),"
      + "linear-gradient(180deg,transparent " + (height * zoom - 1) + "px, " + gridColor + " " + (height * zoom - 1) + "px, " + gridColor + " " + (height * zoom) + "px)";
  }
}


