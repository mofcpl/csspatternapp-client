import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { confirmEmailValidator } from "./confirmEmail.validator";
import { confirmPasswordValidator } from "./confirmPassword.validator";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    host: {'class': 'container-window'}
  })
export class SignUpComponent {
  form: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      username: ['', {validators:[Validators.required]}],
      email: ['', {validators:[Validators.required, Validators.email]}],
      repeatEmail: ['', {validators:[Validators.required]}],
      password: ['', {validators:[Validators.required]}],
      repeatPassword: ['', {validators:[Validators.required]}]
    },
    { validators: [confirmEmailValidator, confirmPasswordValidator]}
    )

    this.form.valueChanges.subscribe((form) =>
    {
      console.log(form)
    })
  }

  cancel() {
    this.router.navigate([''])
  }

  submit() {
    console.log(this.form)
  }
    
}