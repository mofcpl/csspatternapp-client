import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPattern, ISelected, Type } from '../core/models/pattern.model';
import { Observable } from 'rxjs';
import { selectLinears, selectRadials, selectSelected } from '../core/store/pattern.selectors';
import { Linear } from '../core/models/linear.model';
import { Radial } from '../core/models/radial.model';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
  host: {'class': 'area'}
})
export class PropertiesComponent {
  linears$: Observable<Linear[]>;
  radials$: Observable<Radial[]>;
  selected$: Observable<ISelected>;
  Type = Type;

  constructor(private store: Store<{pattern: IPattern}>) {
    this.linears$ = store.select(selectLinears);
    this.radials$ = store.select(selectRadials);
    this.selected$ = store.select(selectSelected);
  }

}
