import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { confirmEmailValidator } from "./confirmEmail.validator";
import { confirmPasswordValidator } from "./confirmPassword.validator";
import { Store } from "@ngrx/store";
import { authState } from "../core/store/auth/auth.reducer";
import { signupStart } from "../core/store/auth/auth.actions";
import { Observable, map } from "rxjs";
import { selectErrors, selectLoadingStatus, selectSignupStatus } from "../core/store/auth/auth.selectors";
import { registerError } from "../core/models/user.model";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    host: {'class': 'container-window'}
  })
export class SignUpComponent {
  form: FormGroup;
  isLoading$: Observable<boolean>;
  isSuccess$: Observable<boolean>
  errors: string[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<{auth: authState}>) {
    this.form = formBuilder.group({
      username: ['', {validators:[Validators.required]}],
      email: ['', {validators:[Validators.required, Validators.email]}],
      repeatEmail: ['', {validators:[Validators.required]}],
      password: ['', {validators:[Validators.required]}],
      repeatPassword: ['', {validators:[Validators.required]}]
    },
    { validators: [confirmEmailValidator, confirmPasswordValidator]}
    )

    store.select(selectErrors).subscribe( (errorsObject) => {
      if(errorsObject) this.errors = Object.values(errorsObject);
    })
    this.isSuccess$ = store.select(selectSignupStatus);
    this.isLoading$ = store.select(selectLoadingStatus);
    this.isLoading$.subscribe( (isLoading) => {
      if(isLoading) this.form.disable();
      else this.form.enable();
    })
  }

  cancel() {
    this.router.navigate([''])
  }

  submit() { 
    this.store.dispatch(signupStart({value: {
      name: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password
    }}))
  }
    
}