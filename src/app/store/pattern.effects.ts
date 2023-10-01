import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of, switchMap, tap, withLatestFrom } from "rxjs";
import { Pattern } from "../models/pattern.model";
import { Injectable } from "@angular/core";
import { init, set, setBackground } from "./pattern.actions";
import { initialState } from "./pattern.reducer";
import { selectPattern } from "./pattern.selectors";

@Injectable()
export class PatternEffects {

    constructor(private actions$: Actions, private store: Store<{pattern: Pattern}>) { }

    loadPattern = createEffect(
        () => this.actions$.pipe(
                ofType(init),
                switchMap(() => {
                    const storedPattern = localStorage.getItem('pattern');
                    if (storedPattern) {
                        return of(set({value: JSON.parse(storedPattern)}))
                    }
                    return of(set({value: initialState}))
                })
            )
    )

    savePattern = createEffect(
        () => this.actions$.pipe(
            ofType(setBackground),
            withLatestFrom(this.store.select(selectPattern)),
            tap(([action, pattern]) => {
                
                const serializedState: string = JSON.stringify(pattern);
                localStorage.setItem('pattern', serializedState)
            })
        ),
        { dispatch: false }
    );




}