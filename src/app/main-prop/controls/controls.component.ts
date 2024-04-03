import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { ApplicationState } from 'src/app/core/models/applicationState.model';
import { IPattern, Positioning } from 'src/app/core/models/pattern.model';
import { setGrid, setRepeat, setZoom } from 'src/app/core/store/app/app.actions';
import { selectRepeat, selectZoom } from 'src/app/core/store/app/app.selectors';
import { setBackgroundColor, setHeight, setPositioning, setWidth } from 'src/app/core/store/pattern/pattern.actions';
import { selectBackgroundColor, selectHeight, selectMainGrid, selectPositioning, selectWidth } from 'src/app/core/store/pattern/pattern.selectors';

export enum Property {
  BackgroundColor,
  Width,
  Height,
  Positioning,
  Grid,
  Repeat,
  Zoom
}

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit, OnDestroy {
  Property = Property

  backgroundColor$: Observable<string>;
  width$: Observable<number>;
  height$: Observable<number>;
  positioning$: Observable<Positioning>;

  grid$: Observable<boolean>;
  repeat$: Observable<boolean>;
  zoom$: Observable<number>;

  constructor(private store: Store<{pattern: IPattern, app: ApplicationState}>) {
    this.backgroundColor$ = store.select(selectBackgroundColor);
    this.width$ = store.select(selectWidth);
    this.height$ = store.select(selectHeight);
    this.positioning$ = store.select(selectPositioning);

    this.grid$ = store.select(selectMainGrid)
    this.repeat$ = store.select(selectRepeat)
    this.zoom$ = store.select(selectZoom)
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    
  }

  changeProperties(event: any, property: Property) {
    switch(property) {
      case Property.BackgroundColor: this.store.dispatch(setBackgroundColor({payload: event.target.value})); break;
      case Property.Width: this.store.dispatch(setWidth({payload: event.target.value})); break;
      case Property.Height: this.store.dispatch(setHeight({payload: event.target.value})); break;
      case Property.Positioning: this.store.dispatch(setPositioning({payload: event.target.value})); break;
      
      case Property.Grid: this.store.dispatch(setGrid({payload: event.target.value})); break;
      case Property.Repeat: this.store.dispatch(setRepeat({payload: event.target.value})); break;
      case Property.Zoom: this.store.dispatch(setZoom({payload: event.target.value})); break;
    }
  }

}
