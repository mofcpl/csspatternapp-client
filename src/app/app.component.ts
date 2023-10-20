import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { init } from './core/store/pattern.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'csspatternapp';

  constructor (private store: Store) {}

  ngOnInit() {
    this.store.dispatch(init());
  }
}
