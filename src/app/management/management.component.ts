import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { authState } from '../core/store/auth/auth.reducer';
import { selectUser } from '../core/store/auth/auth.selectors';
import { User } from '../core/models/user.model';
import { Observable } from 'rxjs';
import { logout } from '../core/store/auth/auth.actions';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
  host: {'class': 'area'}
})
export class ManagementComponent {
  user$: Observable<User | null>;

  constructor(private store: Store<{auth: authState}>) {
    this.user$ = store.select(selectUser)
  }

  logout() {
    this.store.dispatch(logout())
  }

}