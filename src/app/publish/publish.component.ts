import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IPattern } from "../core/models/pattern.model";
@Component({
    selector: 'publish',
    templateUrl: './publish.component.html',
    styleUrls: ['./publish.component.scss'],
    host: {'class': 'container-window'}
  })
export class PublishComponent {

  form: FormGroup;
  errors: string[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<{pattern: IPattern}>) {
    this.form = formBuilder.group({
      name: ['', Validators.required]
    })
  }

  submit() {
    
  }

  cancel() {
    this.router.navigate([''])
  }
    
}