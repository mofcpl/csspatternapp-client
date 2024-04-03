import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { AppActions, PatternActions } from "../../action-types"
import { map, withLatestFrom } from "rxjs"
import { selectLayerCount } from "./pattern.selectors"
import { Store } from "@ngrx/store"
import { IPattern } from "../../models/pattern.model"


@Injectable()
export class PatternEffect{
    
    constructor(private actions$: Actions, private store: Store<{pattern: IPattern}>) {}
    
    // addLayer$ = createEffect(() => 
    //     this.actions$.pipe(
    //         ofType(PatternActions.addLinear, PatternActions.addRadial),
    //         withLatestFrom(this.store.select(selectLayerCount)),
    //         map(([action, count]) => {
    //             let layerType = "";
    //             switch(action.type) {
    //                 case "[Buttons] Add new linear layer": layerType = "Linear"; break;
    //                 case "[Buttons] Add new radial layer": layerType = "Radial"; break;
    //             }
    //             return AppActions.addLayer({payload: layerType + count})
    //         })
    //     ))
}
