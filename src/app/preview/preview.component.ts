import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { ApplicationState } from '../core/models/applicationState.model';
import { IPattern, Positioning } from '../core/models/pattern.model';
import { selectRepeat, selectZoom } from '../core/store/app/app.selectors';
import { selectAllGradients, selectAllLayers, selectBackgroundColor, selectCompleteLayers, selectHeight, selectMainGrid, selectPositioning, selectWidth } from '../core/store/pattern/pattern.selectors';
import { Layer } from '../core/models/layer.model';
import { ColorStop, Gradient } from '../core/models/gradient.model';
import { PatternService } from '../core/services/pattern.service';

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
  layers$: Observable<Layer[]>;
  gradients$: Observable<Gradient[]>;
  completeLayers$: Observable<{layers: Layer[], gradients: Gradient[]}>;

  gridStyle$: Observable<{
    backgroundImage: string | null,
    backgroundSize: string | null
  }>

  previewLayer$: Observable<Preview[]>;

  constructor(private store: Store<{ app: ApplicationState, pattern: IPattern }>, private patternService: PatternService) {
    this.zoom$ = this.store.select(selectZoom);
    this.repeat$ = this.store.select(selectRepeat);

    this.width$ = this.store.select(selectWidth);
    this.height$ = this.store.select(selectHeight);
    this.backgroundColor$ = this.store.select(selectBackgroundColor);
    this.positioning$ = this.store.select(selectPositioning);
    this.grid$ = this.store.select(selectMainGrid);
    this.layers$ = this.store.select(selectAllLayers);
    this.gradients$ = this.store.select(selectAllGradients);
    this.completeLayers$ = this.store.select(selectCompleteLayers);

    this.gridStyle$ = combineLatest([this.width$, this.height$, this.backgroundColor$, this.zoom$, this.grid$]).pipe(
      map(([width, height, backgroundColor, zoom, grid]) => {
        const backgroundImage = this.patternService.generateGridCode(width, height, backgroundColor, zoom, grid);
        const backgroundSize = (width * zoom) + "px " + (height * zoom) + "px";
        return { backgroundImage, backgroundSize }
      })
    )

    this.previewLayer$ = combineLatest([this.completeLayers$, this.width$, this.height$, this.backgroundColor$, this.positioning$, this.repeat$, this.zoom$]).pipe(
      map(([completeLayers, width, height, backgroundColor, positioning, repeat, zoom]) => {
        return completeLayers.layers.map((layer) => {
          const currentLayerGradient = completeLayers.gradients.find((element) => {
            return element.name == layer.name
          })
          if (!currentLayerGradient) throw Error;
          return this.prepareLayer(layer, currentLayerGradient.stops, width, height, backgroundColor, positioning, repeat, zoom);
        })
      }
      ))
  }

  prepareLayer(layer: Layer, colorStops: ColorStop[], width: number, height: number, backgroundColor: string, positioning: Positioning, repeat: boolean, zoom: number): Preview {
    return this.patternService.generateLayerCode(layer, colorStops, positioning, zoom, backgroundColor, width, height, layer.grid)
  }
}
