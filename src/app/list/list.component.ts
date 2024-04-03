import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationState } from '../core/models/applicationState.model';
import { selectSelectedIndex } from '../core/store/app/app.selectors';
import { Layer } from '../core/models/layer.model';
import { selectAllLayers } from '../core/store/pattern/pattern.selectors';
import { IPattern } from '../core/models/pattern.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  host: {'class': 'area'}
})
export class ListComponent {
  selectedIndex$: Observable<number>;
  Layers$: Observable<Layer[]>;

  constructor(private store: Store<{app: ApplicationState, pattern: IPattern}>) {
    this.selectedIndex$ = store.select(selectSelectedIndex);
    this.Layers$ = store.select(selectAllLayers);
  }

  // selectLayer(type: Type, index: number) {
  //   this.store.dispatch(select({value: {type, index}}))
  // }

  // switchGrid(type: Type, index: number) {
  //   this.store.dispatch(switchGrid({value: {type, index}}))
  // }

  // switchVisibility(type: Type, index: number) {
  //   this.store.dispatch(switchVisibility({value: {type, index}}))
  // }

}