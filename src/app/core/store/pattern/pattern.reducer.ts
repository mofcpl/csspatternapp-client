import { createEntityAdapter } from "@ngrx/entity";
import { Layer } from "../../models/layer.model";
import { Linear } from "../../models/linear.model";
import { IPattern, Positioning } from "../../models/pattern.model";
import { Radial, Shape, Size } from "../../models/radial.model";
import { createReducer, on } from "@ngrx/store";
import { PatternActions } from "../../action-types";
import { ColorStop, Gradient } from "../../models/gradient.model";

export const layerAdapter = createEntityAdapter<Layer>({selectId: (layer: Layer) => layer.name});
export const gradientsAdapter = createEntityAdapter<Gradient>({selectId: (colorStops) => colorStops.name});

export const defalutColorStop: ColorStop = {
    position: 0,
    color: "#000000",
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
    visible: true,
    grid: false,
    name: ""
}

const defaultRadial: Radial = {
    shape: Shape.Ellipse,
    size: Size.FarthestCorner,
    posx: 50,
    posy: 50,
    autoSize: true,
    width: 0,
    height: 0,
    vertical: 0,
    horizontal: 0,
    visible: true,
    grid: false,
    name: ""
}

const initialState: IPattern = {
    backgroundColor: "#ffffff",
    width: 100,
    height: 100,
    positioning: Positioning.Relative,
    layers: layerAdapter.getInitialState(),
    grid: false,
    gradients: gradientsAdapter.getInitialState()
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
    on(PatternActions.toggleMainGrid, (state, action) => {
        return {
            ...state,
            grid: !state.grid
        }
    }),
    on(PatternActions.addLinear, (state, action) => {
        const layers =  layerAdapter.addOne({...defaultLinear, name: action.payload}, state.layers);
        const gradients = gradientsAdapter.addOne({stops: [defalutColorStop], name: action.payload}, state.gradients);
        return {
            ...state,
            layers,
            gradients
        }
    }),
    on(PatternActions.addRadial, (state, action) => {
        const layers = layerAdapter.addOne({...defaultRadial, name: action.payload}, state.layers);
        const gradients = gradientsAdapter.addOne({stops: [defalutColorStop], name: action.payload}, state.gradients);
        return {
            ...state,
            layers,
            gradients
        }
    }),
    on(PatternActions.toggleVisibility, (state, action) => {
        const visible = state.layers.entities[action.payload]?.visible;
        const layers = layerAdapter.updateOne({id: action.payload, changes: {visible: !visible}}, state.layers);
        return {
            ...state,
            layers
        }
    }),
    on(PatternActions.toggleGrid, (state, action) => {
        const grid = state.layers.entities[action.payload]?.grid;
        const layers = layerAdapter.updateOne({id: action.payload, changes: {grid: !grid}}, state.layers)
        return {
            ...state,
            layers
        }
    }),
    on(PatternActions.updateLayer, (state, action) => {
        const layers = layerAdapter.updateOne({id: action.payload.name, changes: {...action.payload}}, state.layers);
        return {
            ...state,
            layers
        }
    }),
    on(PatternActions.updateGradient, (state, action) => {
        const gradients = gradientsAdapter.updateOne({id: action.payload.name, changes: {...action.payload}}, state.gradients);
        return {
            ...state,
            gradients
        }
    }),
    on(PatternActions.deleteLayer, (state, action) => {
        const layers = layerAdapter.removeOne(action.payload, state.layers);
        const gradient = gradientsAdapter.removeOne(action.payload, state.gradients);
        return {
            ...state,
            layers,
            gradient
        }
    }),
    on(PatternActions.loadPattern, (state, action) => {
        const gradients = gradientsAdapter.setAll(action.payload.data.gradients, state.gradients)
        const layers = layerAdapter.setAll(action.payload.data.layers, state.layers)

        return {
            backgroundColor: action.payload.data.backgroundColor,
            width: action.payload.data.width,
            height: action.payload.data.height,
            positioning: action.payload.data.positioning,
            layers: layers,
            grid: action.payload.data.grid,
            gradients: gradients
        }
    })
)

