import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pattern } from 'src/app/models/pattern.model';
import { setBackground } from 'src/app/store/pattern.actions';
import { selectPattern } from 'src/app/store/pattern.selectors';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  
  backgroundColor: string = '#000000';

  constructor(private store: Store<{pattern: Pattern}>) {}

  ngOnInit() {
    this.store.select(selectPattern).subscribe((state) => {
      if (state.backgroundColor !== this.backgroundColor) {
        this.backgroundColor = state.backgroundColor;
      }
    })
  }

  changeBackgroundColor() {
    this.store.dispatch(setBackground({value: this.backgroundColor}))
  }

}
