import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPattern } from '../core/models/pattern.model';
import { selectBackgroundColor, selectGrid, selectPropsForGrid } from '../core/store/pattern.selectors';
import { Observable, map } from 'rxjs';
import { PreviewService } from './preview.service';

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

  constructor(private service: PreviewService,private store: Store<{pattern: IPattern}>){
    
    this.backgroundColor$ = store.select(selectBackgroundColor);
    
    this.gridStyle$ = store.select(selectPropsForGrid).pipe(
      map((data) => {
        const color = service.hexToRgb(data.backgroundColor);
        const gridColor = (color[0]+color[1]+color[2] < 382) ? "rgb(255,255,255)" : "rgb(0,0,0)";
        const backgroundImage = this.drawGrid(data.size.width, data.size.height, gridColor, data.zoom);
        const backgroundSize = (data.size.width * data.zoom)+"px "+ (data.size.height * data.zoom)+"px";
        return { backgroundImage, backgroundSize }
      })
    )

    this.grid$ = store.select(selectGrid);
  }

  drawGrid(width: number, height: number, color: string, zoom: number): string {
    return "linear-gradient(90deg,transparent "+(width * zoom - 1)+"px, "+color+" "+(width * zoom - 1)+"px, "+color+" "+(width * zoom)+"px),"
      +"linear-gradient(180deg,transparent "+(height * zoom - 1)+"px, "+color+" "+(height * zoom -1)+"px, "+color+" "+(height * zoom)+"px)";
  }

}
