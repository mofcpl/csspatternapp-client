import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store, createAction } from "@ngrx/store";
import { catchError, exhaustAll, exhaustMap, map, mergeMap, of, switchMap, tap, withLatestFrom } from "rxjs";
import { IPattern, ISelected, Type, publishError } from "../../models/pattern.model";
import { Injectable } from "@angular/core";
import { deleteLine, deleteRadius, loadPattern, methodFail, publishPatternStart, publishPatternSuccess, select, setMainProp} from "./pattern.actions";
import { initialState } from "./pattern.reducer";
import { selectLinears, selectList, selectPattern, selectRadials, selectSelected } from "./pattern.selectors";
import { HttpClient } from "@angular/common/http";
import { CodeService } from "src/app/code/code.service";

@Injectable()
export class PatternEffects {
    http: HttpClient;
    codeService: CodeService;

    constructor(private actions$: Actions, private store: Store<{pattern: IPattern}>, http: HttpClient, codeService: CodeService) {
        this.http = http;
        this.codeService = codeService;
    }

    loadPattern = createEffect(
        () => this.actions$.pipe(
                ofType(loadPattern),
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

    changeSelectedAfterDelete = createEffect(
        () => this.actions$.pipe(
            ofType(deleteLine, deleteRadius),
            withLatestFrom(this.store.select(selectList)),
            switchMap(([action, list]) => {
                let isLayerEmpty: boolean = false;
                switch(action.type) {
                    case "[Pattern] Delete line": if(list.linears[action.value.linearIndex] && list.linears[action.value.linearIndex].lines.length < 1) isLayerEmpty = true; break;
                    case "[Pattern] Delete radius": if(list.radials[action.value.radialIndex] && list.radials[action.value.radialIndex].rays.length < 1) isLayerEmpty = true; break;
                }
                if(isLayerEmpty) return of(select({value: {type: Type.None, index: 0}}))
                else return of(select({value: list.selected}))
            })
        )
    )

    publishPattern = createEffect(
        () => this.actions$.pipe(
            ofType(publishPatternStart),
            withLatestFrom(this.store.select(selectPattern)),
            switchMap(([action, pattern]) => {
                return this.http.post<any>("http://127.0.0.1:8080/project", {
                    title: action.value.name,
                    data: JSON.stringify(pattern),
                    style: this.codeService.generateCode(pattern)
                })
                .pipe(
                    map( () => publishPatternSuccess()),
                    catchError((error) => of(methodFail({value: error.error})))
                )
            })
        )
    )
}   