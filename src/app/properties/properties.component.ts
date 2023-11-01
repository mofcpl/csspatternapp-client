import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPattern, ISelected, Type } from '../core/models/pattern.model';
import { Observable, combineLatest, map } from 'rxjs';
import { selectLinears, selectRadials, selectSelected } from '../core/store/pattern.selectors';
import { Linear } from '../core/models/linear.model';
import { Radial } from '../core/models/radial.model';
import { PropertiesService } from './properties.service';
import { addLine, addRadius, deleteLine, deleteRadius, updateLine, updateLinear, updateRadial, updateRadius } from '../core/store/pattern.actions';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
  host: {'class': 'area'}
})
export class PropertiesComponent implements OnInit{
  list$: Observable<{
    radial: Radial, 
    linear: Linear, 
    selected: {
      type: Type, 
      index: number
    }}>
  Type = Type;

  constructor(private store: Store<{pattern: IPattern}>, private cd: ChangeDetectorRef, private service: PropertiesService) {

    this.list$ = combineLatest([store.select(selectLinears), store.select(selectRadials), store.select(selectSelected)]).pipe(
      map(([linears, radials, selected]) => ({
        radial: radials[selected.index],
        linear: linears[selected.index],
        selected
      }))
    )
    
  }

  ngOnInit() {
    this.service.linearChanges.subscribe((value) => {
      this.store.dispatch(updateLinear({value}))
    })

    this.service.lineChanges.subscribe((value) => {
      this.store.dispatch(updateLine({value}))
    })

    this.service.radialChanges.subscribe((value) => {
      this.store.dispatch(updateRadial({value}))
    })

    this.service.radiusChanges.subscribe((value) => {
      this.store.dispatch(updateRadius({value}))
    })

    this.service.addLine.subscribe((value) => {
      this.store.dispatch(addLine({value}))
    })

    this.service.addRadius.subscribe((value) => {
      this.store.dispatch(addRadius({value}))
    })

    this.service.deleteLine.subscribe((value) => {
      this.store.dispatch(deleteLine({value}))
    })

    this.service.deleteRadius.subscribe((value) => {
      this.store.dispatch(deleteRadius({value}))
    })

  }

}
