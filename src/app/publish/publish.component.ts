import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IPattern } from "../core/models/pattern.model";
import { selectIsLoading, selectPatternErrors, selectPatternSuccess } from "../core/store/pattern/pattern.selectors";
import { publishPatternStart } from "../core/store/pattern/pattern.actions";

@Component({
    selector: 'publish',
    templateUrl: './publish.component.html',
    styleUrls: ['./publish.component.scss'],
    host: {'class': 'container-window'}
  })
export class PublishComponent {

  form: FormGroup;
  errors: string[] = [];
  isLoading$: Observable<boolean>;
  isSuccess$: Observable<boolean>;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<{pattern: IPattern}>) {
    this.form = formBuilder.group({
      name: ['', Validators.required]
    })

    this.isSuccess$ = store.select(selectPatternSuccess);

    store.select(selectPatternErrors).subscribe( (errorsObject) => {
      if(errorsObject) this.errors = Object.values(errorsObject)
      else this.errors = [];
    })

    this.isLoading$ = store.select(selectIsLoading);
    this.isLoading$.subscribe( (isLoading) => {
      if(isLoading) this.form.disable();
      else this.form.enable();
    })
  }

  submit() {
    this.store.dispatch(publishPatternStart({value: {
      name: this.form.value.name
    }}))
  }

  cancel() {
    this.router.navigate([''])
  }
    
}