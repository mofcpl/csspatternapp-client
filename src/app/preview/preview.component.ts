import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMainProps, IPattern } from '../core/models/pattern.model';
import { selectBackgroundColor, selectGrid, selectLinears, selectMainProps, selectPropsForGrid, selectRadials } from '../core/store/pattern.selectors';
import { Observable, combineLatest, map } from 'rxjs';
import { PreviewService } from './preview.service';
import { Linear } from '../core/models/linear.model';
import { Radial } from '../core/models/radial.model';
import { IPreview } from './preview.model';

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
  //previewRadials$: Observable<IPreview[]>;

  constructor(private service: PreviewService, private store: Store<{ pattern: IPattern }>) {

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

    //this.previewRadials$ = store.select(selectRadials);

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

    let backgroundPosCode = (linear.vertical * props.zoom) + "px " + (linear.horizontal * props.zoom) + "px";
    let backgroundWidthCode = (linear.autoSize == true) ? autoWidth : width;
    let backgroundHeightCode = (linear.autoSize == true) ? autoHeight : height;
    let backgroundSizeCode = backgroundWidthCode + "px " + backgroundHeightCode + "px "

    const visibility = (linear.visible == true) ? "visible" : "hidden";

    return {
      image: backgroundImageCode, 
      position: backgroundPosCode, 
      visibility: visibility, 
      grid: linear.grid, 
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


