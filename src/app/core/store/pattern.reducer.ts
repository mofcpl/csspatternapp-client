import { createReducer, on } from "@ngrx/store";
import { IPattern, Type } from "../models/pattern.model";
import { addLinear, addRadial, clone, select, setMainProp, setPattern, switchGrid} from "./pattern.actions";
import { Line, Linear } from "../models/linear.model";
import { Radial, Ray } from "../models/radial.model";

export const initialState: IPattern = {
    backgroundColor: "#ffffff",
    width: 100,
    height: 100,
    zoom: 1.0,
    grid: true,
    repeat: true,
    positioning: "%",
    linears: [],
    radials: [],
    selected: {
        type: Type.None,
        index: 0
    }
}

const defaultLine: Line = {
    position: 0, 
    color: "#000000", 
    size: 5, 
    opacity: 100, 
    blur: 0
}

const defaultLinear: Linear = {
    direction: 90,
    width: 0, 
    height: 0, 
    autoSize: true, 
    vertical: 0, 
    horizontal: 0, 
    visible: true, 
    grid: false, 
    lines: [defaultLine]
}

const defaultRay: Ray = {
    position: 0, 
    color: "#000000", 
    size: 5, 
    opacity: 100, 
    blur: 0 
}

const defaultRadial: Radial = {
    shape: "ellipse", 
    autoSize: true, 
    size: "farthest-corner", 
    posx: 50, 
    posy: 50, 
    vertical: 0, 
    horizontal: 0, 
    visible: true, 
    grid: false,
    rays: [defaultRay]
}

export const patternReducer = createReducer(
    initialState,
    on(setMainProp, (state, action) => {
        return {
            ...state,
            ...action.value
        }
    }),
    on(setPattern, (state, action) => action.value),
    on(addLinear, (state, action) => {
        return {
            ...state,
            linears: [...state.linears, defaultLinear]
        }
    }),
    on(addRadial, (state, action) => {
        return {
            ...state,
            radials: [...state.radials, defaultRadial]
        }
    }),
    on(clone, (state, action) => {
        switch(state.selected.type) {
            case Type.Radial: return {
                ...state,
                radials: [...state.radials, state.radials[state.selected.index]]
            }
            case Type.Linear: return {
                ...state,
                linears: [...state.linears, state.linears[state.selected.index]]
            };
            default: return state;
        }
    }),
    on(select, (state, action) => {
        return {
            ...state,
            selected: action.value
        }
    }),
    on(switchGrid, (state, action) => {
        const changeGrid = (element: any, index: number) => {
            return index == action.value.index ? {...element, grid: !element.grid} : element
        }
        
        switch(action.value.type) {           
            case Type.Radial: return {
                ...state,
                radials: state.radials.map(changeGrid)
            }
            case Type.Linear: return {
                ...state,
                linears: state.linears.map(changeGrid)
            }
            default: return state;
        }
    })
)