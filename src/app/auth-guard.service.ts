import { Injectable, inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { authState } from "./core/store/auth/auth.reducer";
import { selectUser } from "./core/store/auth/auth.selectors";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard{
    isLoggedIn: boolean = false;

    constructor(private store: Store<{auth: authState}>) {
        store.select(selectUser).subscribe( (user) => {
            this.isLoggedIn = !!user;
        })
    }
    
    canActivate():boolean {
        return this.isLoggedIn;
    }
}

export const canActivate: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(AuthGuard).canActivate()
    };
