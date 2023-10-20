import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of, switchMap, tap, withLatestFrom } from "rxjs";
import { IPattern } from "../models/pattern.model";
import { Injectable } from "@angular/core";
import { init, setMainProp} from "./pattern.actions";
import { initialState } from "./pattern.reducer";
import { selectPattern } from "./pattern.selectors";

@Injectable()
export class PatternEffects {

    constructor(private actions$: Actions, private store: Store<{pattern: IPattern}>) { }

    loadPattern = createEffect(
        () => this.actions$.pipe(
                ofType(init),
                switchMap(() => {
                    const storedPattern = localStorage.getItem('pattern');
                    if (storedPattern) {
                        return of(setMainProp({value: JSON.parse(storedPattern)}))
                    }
                    return of(setMainProp({value: initialState}))
                })
            )
    )

    savePattern = createEffect(
        () => this.actions$.pipe(
            ofType(setMainProp),
            withLatestFrom(this.store.select(selectPattern)),
            tap(([action, pattern]) => {
                
                const serializedState: string = JSON.stringify(pattern);
                localStorage.setItem('pattern', serializedState)
            })
        ),
        { dispatch: false }
    );




}