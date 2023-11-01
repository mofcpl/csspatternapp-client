import { Component } from '@angular/core';
import { IPattern } from '../core/models/pattern.model';
import { Store } from '@ngrx/store';
import { selectList } from '../core/store/pattern.selectors';
import { Radial } from '../core/models/radial.model';
import { Observable } from 'rxjs';
import { Linear } from '../core/models/linear.model';
import { Type } from '../core/models/pattern.model';
import { select, switchGrid, switchVisibility } from '../core/store/pattern.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  host: {'class': 'area'}
})
export class ListComponent {
  list$: Observable<{
    radials: Radial[],
    linears: Linear[],
    selected: {
      type: Type,
      index: number
    }
  }>;
  Type = Type;

  constructor(private store: Store<{pattern: IPattern}>) {
    this.list$ = this.store.select(selectList);
    this.list$.subscribe((data) => {
      console.log(data)
    });
  }

  selectLayer(type: Type, index: number) {
    this.store.dispatch(select({value: {type, index}}))
  }

  switchGrid(type: Type, index: number) {
    this.store.dispatch(switchGrid({value: {type, index}}))
  }

  switchVisibility(type: Type, index: number) {
    this.store.dispatch(switchVisibility({value: {type, index}}))
  }

}
