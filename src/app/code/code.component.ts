import { Component } from '@angular/core';
import { IPattern } from '../core/models/pattern.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPattern } from '../core/store/pattern.selectors';
import { CodeService } from './code.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  host: {'class': 'area'}
})
export class CodeComponent {

  pattern!: IPattern;
  code: string = "Press button to generate code...";

  constructor(private service: CodeService ,private store: Store<{ pattern: IPattern }>) {
    store.select(selectPattern).subscribe((pattern) => {
      this.pattern = pattern
    })
  }

  generate() {
    this.code = this.service.generateCode(this.pattern);
  }

}
