import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { Layer } from '../core/models/layer.model';
import { ApplicationState } from '../core/models/applicationState.model';
import { IPattern } from '../core/models/pattern.model';
import { selectSelectedIndex } from '../core/store/app/app.selectors';
import { selectAllGradients, selectAllLayers } from '../core/store/pattern/pattern.selectors';
import { ColorStop, Gradient } from '../core/models/gradient.model';
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
  colorStops$: Observable<Gradient[]>;
  selectedIndex$: Observable<number>;
  properties$: Observable<{layer: Layer, gradient: Gradient, index: number} | undefined>

constructor(private store: Store<{app: ApplicationState, pattern: IPattern}>) {
  this.selectedIndex$ = store.select(selectSelectedIndex);
  this.layers$ = store.select(selectAllLayers);
  this.colorStops$ = store.select(selectAllGradients);

  this.properties$ = combineLatest([this.layers$, this.colorStops$, this.selectedIndex$]).pipe(
    map(([layers, gradient, index]) => {
      if(layers.length) {
        const stops = gradient.find((element) => element.name == layers[index].name);
      if(layers && stops && index !== undefined) {
        return {
          layer: layers[index],
          gradient: stops,
          index: index
        }
      } else return undefined
      }
      else return undefined
    })
  )
}

updateLayer(layer: Layer) {
  this.store.dispatch(PatternActions.updateLayer({payload: layer}))
}

updateColorStop(stops: Gradient, index: number, updatedColorStop: ColorStop) {
  const updatedGradients = JSON.parse(JSON.stringify(stops))
  updatedGradients.stops[index] = updatedColorStop;
  this.store.dispatch(PatternActions.updateGradient({payload: updatedGradients}))
}

addColorStop(stops: Gradient) {
  const updatedGradients = JSON.parse(JSON.stringify(stops))
  updatedGradients.stops.push(defalutColorStop)
  this.store.dispatch(PatternActions.updateGradient({payload: updatedGradients}))
}

deleteColorStop(stops: Gradient, index: number) {
  const updatedGradients = JSON.parse(JSON.stringify(stops))
  updatedGradients.stops.splice(index, 1);
  if(updatedGradients.stops.length == 0) {
    this.store.dispatch(PatternActions.deleteLayer({payload: stops.name}))
  }
  this.store.dispatch(PatternActions.updateGradient({payload: updatedGradients}))
}

trackById(index: number, obj: any): any {
  return index;
}


}