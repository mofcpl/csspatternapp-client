import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IPattern } from 'src/app/core/models/pattern.model';
import { nameTakenValidator } from './name-taken.validator';
import { Observable } from 'rxjs';
import { Layer } from 'src/app/core/models/layer.model';
import { selectAllLayers } from 'src/app/core/store/pattern/pattern.selectors';

@Component({
  selector: 'app-type-name',
  templateUrl: './type-name.component.html',
  styleUrls: ['./type-name.component.scss'],
  host: {'class': 'container-window pop-up-background'}
})
export class TypeNameComponent {

  @Output() close = new EventEmitter<boolean>;
  @Output() name = new EventEmitter<string>;

  form: FormGroup;
  Layers$: Observable<Layer[]>;

  constructor(private formBuilder: FormBuilder, private store: Store<{pattern: IPattern}>) {
    this.Layers$ = store.select(selectAllLayers);
    this.form = formBuilder.group({
      name: ['', { validators: [Validators.required], asyncValidators: [nameTakenValidator(this.Layers$)]}]
    })
  }

  submit() {
    if(this.form.valid) {
      this.name.emit(this.form.controls['name'].value)
    }
  }

  cancel() {
    this.close.emit(true)
  }

}
