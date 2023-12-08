import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { authState } from "../core/store/auth/auth.reducer";
import { Observable } from "rxjs";
import { User } from "../core/models/user.model";
import { selectErrors, selectLoadingStatus, selectUser } from "../core/store/auth/auth.selectors";
import { userPatchStart } from "../core/store/auth/auth.actions";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    host: {'class': 'container-window'}
  })
export class AccountComponent {
  form: FormGroup;
  user$: Observable<User | null>;
  errors: string[] = [];
  isLoading$: Observable<boolean>;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<{auth: authState}>) {
    this.form = formBuilder.group({
      username: [''],
      homepage: ['']
    })

    this.user$ = store.select(selectUser);
    this.user$.subscribe(data => this.form.patchValue({ ...data }, {emitEvent: false}));

    store.select(selectErrors).subscribe( (errorsObject) => {
      if(errorsObject) this.errors = Object.values(errorsObject)
      else this.errors = [];
    })

    this.isLoading$ = store.select(selectLoadingStatus);
    this.isLoading$.subscribe( (isLoading) => {
      if(isLoading) this.form.disable();
      else this.form.enable();
    })
  }

  submit() {
    this.store.dispatch(userPatchStart({value: {
      name: (this.form.value.username) ? this.form.value.username : null,
      homepage: (this.form.value.homepage) ? this.form.value.homepage : null,
      email: null,
      password: null
    }}))
  }

  cancel() {
    this.router.navigate([''])
  }
    
}