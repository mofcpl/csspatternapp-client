import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { authState } from "../core/store/auth/auth.reducer";
import { selectErrors } from "../core/store/auth/auth.selectors";
import { signinStart } from "../core/store/auth/auth.actions";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    host: {'class': 'container-window'}
  })
export class SignInComponent {
  form: FormGroup;
  errors: string[] = [];
  
  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<{auth: authState}>) {
    this.form = formBuilder.group({
      email: ['', {validators:[Validators.required, Validators.email]}],
      password: ['', {validators:[Validators.required]}]
    })

    store.select(selectErrors).subscribe( (errorsObject) => {
      if(errorsObject) this.errors = Object.values(errorsObject);
    })
  }

  cancel() {
    this.router.navigate([''])
  }

  submit() {
    this.store.dispatch(signinStart({ value: {
      email: this.form.value.email,
      password: this.form.value.password
    }}))
  }
}