import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPattern } from 'src/app/core/models/pattern.model';
import { addLinear, addRadial, clone } from 'src/app/core/store/pattern.actions';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {

  constructor(private store: Store<{pattern: IPattern}>) {}

  addLinear() {
    this.store.dispatch(addLinear())
  }

  addRadial() {
    this.store.dispatch(addRadial())
  }

  clone() {
    this.store.dispatch(clone());
  }

}
