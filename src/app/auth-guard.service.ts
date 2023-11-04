import { Injectable, inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard{
    constructor() {}
    canActivate():boolean {
        return true
    }
}

export const canActivate: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(AuthGuard).canActivate()
    };
