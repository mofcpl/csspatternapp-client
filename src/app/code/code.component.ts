import { Component, OnDestroy } from '@angular/core';
import { IPattern, Positioning } from '../core/models/pattern.model';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Gradient } from '../core/models/gradient.model';
import { Layer } from '../core/models/layer.model';
import { selectAllGradients, selectAllLayers, selectBackgroundColor, selectHeight, selectMainGrid, selectPositioning, selectWidth } from '../core/store/pattern/pattern.selectors';
import { ApplicationState } from '../core/models/applicationState.model';
import { selectRepeat, selectZoom } from '../core/store/app/app.selectors';
import { PatternService } from '../core/services/pattern.service';


@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  host: {'class': 'area'}
})
export class CodeComponent implements OnDestroy{

  backgroundColor!: string;
  width!: number;
  height!: number;
  positioning!: Positioning;
  layers!: Layer[]
  gradients!: Gradient[];
  repeat!: boolean;
  zoom!: number;

  code: string = "Press button to generate code...";

  width$: Subscription;
  height$: Subscription;
  backgroundColor$: Subscription;
  positioning$: Subscription;
  layers$: Subscription;
  gradients$: Subscription;
  repeat$: Subscription;
  zoom$: Subscription;
  
  constructor(private store: Store<{ app: ApplicationState, pattern: IPattern }>, private patternService: PatternService) {
    this.width$ = this.store.select(selectWidth).subscribe((width) => {
      this.width = width;
    })
    this.height$ = this.store.select(selectHeight).subscribe((height) => {
      this.height = height;
    });
    this.backgroundColor$ = this.store.select(selectBackgroundColor).subscribe((backgroundColor) => {
      this.backgroundColor = backgroundColor;
    });
    this.positioning$ = this.store.select(selectPositioning).subscribe((positioning) => {
      this.positioning = positioning;
    });
    this.layers$ = this.store.select(selectAllLayers).subscribe((layers) => {
      this.layers = layers;
    });
    this.gradients$ = this.store.select(selectAllGradients).subscribe((gradients) => {
      this.gradients = gradients;
    });
    this.repeat$ = this.store.select(selectRepeat).subscribe((repeat) => {
      this.repeat = repeat;
    })
    this.zoom$ = this.store.select(selectZoom).subscribe((zoom) => {
      this.zoom = zoom;
    })
  }

  generate() {
    if(this.layers.length > 0) {
      this.code = this.patternService.generatePatternCode(
        this.layers, 
        this.gradients, 
        this.positioning, 
        this.zoom, 
        this.backgroundColor, 
        this.width, 
        this.height,
        this.repeat)
    }
    
  }

  ngOnDestroy(): void {
    this.width$.unsubscribe();
    this.height$.unsubscribe();
    this.backgroundColor$.unsubscribe();
    this.positioning$.unsubscribe();
    this.layers$.unsubscribe();
    this.gradients$.unsubscribe();
    this.repeat$.unsubscribe();
  }

}