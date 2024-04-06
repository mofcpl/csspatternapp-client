import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { Layer } from '../core/models/layer.model';
import { ApplicationState } from '../core/models/applicationState.model';
import { IPattern } from '../core/models/pattern.model';
import { selectSelectedIndex } from '../core/store/app/app.selectors';
import { selectAllColorStops, selectAllLayers } from '../core/store/pattern/pattern.selectors';
import { ColorStop, ColorStops } from '../core/models/colorStop.model';
import { Size, Shape } from '../core/models/radial.model';
import { PatternActions } from '../core/action-types';
import { defalutColorStop } from '../core/store/pattern/pattern.reducer';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
  host: {'class': 'area'}
})
export class PropertiesComponent{

  Size = Size;
  Shape = Shape;

  layers$: Observable<Layer[]>;
  colorStops$: Observable<ColorStops[]>;
  selectedIndex$: Observable<number>;
  layerWithStops$: Observable<{layer: Layer, colorStops: ColorStops, index: number} | undefined>

constructor(private store: Store<{app: ApplicationState, pattern: IPattern}>) {
  this.selectedIndex$ = store.select(selectSelectedIndex);
  this.layers$ = store.select(selectAllLayers);
  this.colorStops$ = store.select(selectAllColorStops);

  this.layerWithStops$ = combineLatest([this.layers$, this.colorStops$, this.selectedIndex$]).pipe(
    map(([layers, colorStops, index]) => {
      const stops = colorStops.find((element) => element.name == layers[index].name);
      if(layers && stops && index !== undefined) {
        return {
          layer: layers[index],
          colorStops: stops,
          index: index
        }
      } else return undefined
       
    })
  )
}

updateLayer(layer: Layer) {
  this.store.dispatch(PatternActions.updateLayer({payload: layer}))
}

updateColorStop(stops: ColorStops, index: number, updatedColorStop: ColorStop) {
  const updatedStops = JSON.parse(JSON.stringify(stops))
  updatedStops.stops[index] = updatedColorStop;
  this.store.dispatch(PatternActions.updateColorStops({payload: updatedStops}))
}

addColorStop(stops: ColorStops) {
  const updatedStops = JSON.parse(JSON.stringify(stops))
  updatedStops.stops.push(defalutColorStop)
  this.store.dispatch(PatternActions.updateColorStops({payload: updatedStops}))
}

deleteColorStop(stops: ColorStops, index: number) {
  const updatedStops = JSON.parse(JSON.stringify(stops))
  updatedStops.stops.splice(index, 1);
  this.store.dispatch(PatternActions.updateColorStops({payload: updatedStops}))
}

trackById(index: number, obj: any): any {
  return index;
}

// setDirection(direction: number) {
  
// }
// setShape(shape: Shape) {
  
// }
// setAutoSize(autoSize: boolean) {
  
// }
// setWidth(width: number) {
  
// }
// setHeight(height: number) {
  
// }
// setSize(size: Size) {
  
// }
// setPosX(posx: number) {
  
// }
// setPosY(posy: number) {
  
// }
// setVertical(vertical: number) {
  
// }
// setHorizontal(horizontal: number) {
  
// }

}