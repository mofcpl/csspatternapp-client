import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { authState } from "./auth.reducer";
import { Injectable } from "@angular/core";
import { authenticateFail, loadAuth, logout, signinStart, signinSuccess, signupStart, signupSuccess, userPatchStart, userPatchSuccess } from "./auth.actions";
import { switchMap, tap, map, catchError, of, Observable, exhaustMap, mergeMap, withLatestFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User, registerError } from "../../models/user.model";
import { Router } from "@angular/router";
import { selectUser } from "./auth.selectors";


@Injectable()
export class AuthEffects {
  http: HttpClient;

  constructor(private actions$: Actions, private store: Store<{ auth: authState }>, http: HttpClient, private router: Router) {
    this.http = http;
  }

  authSignup = createEffect(
    () => this.actions$.pipe(
      ofType(signupStart),
      mergeMap((action) => {
        return this.http.post<null>('http://127.0.0.1:8080/author', {
          email: action.value.email,
          password: action.value.password,
          name: action.value.name
        })
          .pipe(
            map(() => signupSuccess()),
            catchError((error) => of(authenticateFail({ value: error.error })))
          );
      })
    )
  );

  authSignin = createEffect(
    () => this.actions$.pipe(
      ofType(signinStart),
      exhaustMap((action) => {
        return this.http.post<User>('http://127.0.0.1:8080/auth', {
          email: action.value.email,
          password: action.value.password,
        })
          .pipe(
            map((response) => {
              localStorage.setItem('userData', JSON.stringify(response))
              return signinSuccess({ value: response })
            }),
            catchError((error) => of(authenticateFail({ value: error.error })))
          );
      })
    )
  );

  authSuccess = createEffect(
    () => this.actions$.pipe(
      ofType(signinSuccess),
      tap(() => {
        this.router.navigate([''])
      })
    ),
    { dispatch: false }
  )

  authPatchUser = createEffect(
    () => this.actions$.pipe(
      ofType(userPatchStart),
      withLatestFrom(this.store.select(selectUser)),
      switchMap(([action, user]) => {
        return this.http.patch<null>(`http://127.0.0.1:8080/author/${user?.id}`,
          //Remove empty attributes
          Object.fromEntries(Object.entries(action.value).filter(([_, v]) => v != null)))
          .pipe(
            map(() => userPatchSuccess({ value: action.value })),
            catchError((error) => of(authenticateFail({ value: error.error })))
          );
      })
    )
  );

  loadAuth = createEffect(
    () => this.actions$.pipe(
      ofType(loadAuth),
      exhaustMap(() => {
        const storedUser = localStorage.getItem('userData');
        if (storedUser) {
          return of(signinSuccess({ value: JSON.parse(storedUser) }))
        }
        return of(logout())
      })
    )


  )

  authLogout = createEffect(
    () => this.actions$.pipe(
      ofType(logout),
      tap(() => {
        localStorage.removeItem('userData');
        this.router.navigate(['']);
      })
    ),
    { dispatch: false }
  )

}