import { createEntityAdapter } from "@ngrx/entity";
import { Layer, ColorStops } from "../../models/layer.model";
import { Linear } from "../../models/linear.model";
import { IPattern, Positioning } from "../../models/pattern.model";
import { Radial, Shape, Size } from "../../models/radial.model";
import { createReducer, on } from "@ngrx/store";
import { PatternActions } from "../../action-types";

export const layerAdapter = createEntityAdapter<Layer>();
export const colorStopsAdapter = createEntityAdapter<ColorStops>();

const defalutColorStop: ColorStops = {
    position: 0,
    color: "#000",
    size: 5,
    opacity: 100,
    blur: 0
}

const defaultLinear: Linear = {
    direction: 90,
    autoSize: true,
    width: 0,
    height: 0,
    vertical: 0,
    horizontal: 0,
    stops: colorStopsAdapter.getInitialState(defalutColorStop)
}

const defaultRadial: Radial = {
    shape: Shape.Ellipse,
    size: Size.FarthestCorner,
    posx: 0,
    posy: 0,
    autoSize: false,
    width: 0,
    height: 0,
    vertical: 0,
    horizontal: 0,
    stops: colorStopsAdapter.getInitialState(defalutColorStop)
}

const initialState: IPattern = {
    backgroundColor: "#ffffff",
    width: 100,
    height: 100,
    positioning: Positioning.Relative,
    layers: layerAdapter.getInitialState()
}

export const patternReducer = createReducer(
    initialState,
    on(PatternActions.setBackgroundColor, (state, action) => {
        return {
            ...state,
            backgroundColor: action.payload
        }
    }),
    on(PatternActions.setHeight, (state, action) => {
        return {
            ...state,
            height: action.payload
        }
    }),
    on(PatternActions.setWidth, (state, action) => {
        return {
            ...state,
            width: action.payload
        }
    }),
    on(PatternActions.setPositioning, (state, action) => {
        return {
            ...state,
            positioning: action.payload
        }
    }),
)

