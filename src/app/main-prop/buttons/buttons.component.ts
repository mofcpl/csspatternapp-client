import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPattern } from 'src/app/core/models/pattern.model';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {

  constructor(private store: Store<{pattern: IPattern}>) {}

  addLinear() {
    
  }

  addRadial() {
    
  }

  clone() {
    
  }

}
