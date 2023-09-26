import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  backgroundColor$: Observable<string>;

  constructor(private store: Store<{}>) {
    this.backgroundColor$ = store.select('pattern');
  }
}
