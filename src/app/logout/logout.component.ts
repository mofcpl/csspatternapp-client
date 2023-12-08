import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { logout } from "../core/store/auth/auth.actions";

@Component({
    template: ''
  })
  
  export class LogoutComponent implements OnInit {
  
    constructor(private router: Router, private store: Store) {}
  
    ngOnInit() {
      this.store.dispatch(logout())
    }
  
  }

