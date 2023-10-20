import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { IMainProps, IPattern } from 'src/app/core/models/pattern.model';
import { setMainProp } from 'src/app/core/store/pattern.actions';
import { selectMainProps } from 'src/app/core/store/pattern.selectors';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  mainProps$: Observable<IMainProps>;

  constructor(private formBuilder: FormBuilder, private store: Store<{pattern: IPattern}>) {
    this.form = formBuilder.group({
      backgroundColor: [''],
      width: [''],
      height: [''],
      positioning: [''],
      zoom: [''],
      grid: [''],
      repeat: [''],
    });
    this.mainProps$ = store.select(selectMainProps);
    this.mainProps$.subscribe(data => this.form.patchValue(data, {emitEvent: false}));
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(
      (value: IMainProps) => this.store.dispatch(setMainProp({value}))
    )
  }

  ngOnDestroy() {
    
  }
}
