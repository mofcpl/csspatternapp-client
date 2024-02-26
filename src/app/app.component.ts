import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'csspatternapp';

  constructor (private store: Store) {}

  ngOnInit() {
    // this.store.dispatch(loadPattern());
    // this.store.dispatch(loadAuth());
  }
}
