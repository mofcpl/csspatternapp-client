import { createReducer, on } from "@ngrx/store";
import { IPattern, ISelected, Type } from "../models/pattern.model";
import { addLine, addLinear, addRadial, addRadius, clone, deleteLine, deleteRadius, select, setMainProp, setPattern, switchGrid, switchVisibility, updateLine, updateLinear, updateRadial, updateRadius} from "./pattern.actions";
import { Line, Linear } from "../models/linear.model";
import { Radial, Radius, Shape, Size } from "../models/radial.model";

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

const defaultRay: Radius = {
    position: 0, 
    color: "#000000", 
    size: 5, 
    opacity: 100, 
    blur: 0 
}

const defaultRadial: Radial = {
    shape: Shape.Ellipse, 
    autoSize: true, 
    size: Size.FarthestCorner, 
    width: 0,
    height: 0,
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
    }),
    on(switchVisibility, (state, action) => {
        const changeVisibility = (element: any, index: number) => {
            return index == action.value.index ? {...element, visible: !element.visible} : element
        }
        
        switch(action.value.type) {           
            case Type.Radial: return {
                ...state,
                radials: state.radials.map(changeVisibility)
            }
            case Type.Linear: return {
                ...state,
                linears: state.linears.map(changeVisibility)
            }
            default: return state;
        }
    }),
    on(updateLinear, (state, action) => {
        return {
            ...state,
            linears: state.linears.map((element, index) => (index == action.value.index)? action.value.linear : element)
        }
    }),
    on(updateLine, (state, action) => { 
        return {
            ...state,
            linears: state.linears.map((linearElement, index, array) => {
                if (index == action.value.linearIndex) {
                    return {
                        ...linearElement,
                        lines: linearElement.lines.map((lineElement, index) => (index == action.value.lineIndex)? action.value.line : lineElement)
                    }
                } else return linearElement
            })
        }
    }),
    on(updateRadial, (state, action) => {
        return {
            ...state,
            radials: state.radials.map((element, index) => (index == action.value.index)? action.value.radial : element)
        }
    }),
    on(updateRadius, (state, action) => {
        return {
            ...state,
            radials: state.radials.map((radialElement, index, array) => {
                if (index == action.value.radialIndex) {
                    return {
                        ...radialElement,
                        rays: radialElement.rays.map((radiusElement, index) => (index == action.value.radiusIndex)? action.value.radius : radiusElement)
                    }
                } else return radialElement
            })
        }
    }),
    on(addLine, (state, action) => {
        return {
            ...state,
            linears: state.linears.map((element, index) => {
                if(index == action.value.linearIndex)
                return {
                    ...element,
                    lines: [...element.lines, defaultLine]
                }
                else return element
            })
        }
    }),
    on(addRadius, (state, action) => {
        return {
            ...state,
            radials: state.radials.map((element, index) => {
                if(index == action.value.radialIndex)
                return {
                    ...element,
                    rays: [...element.rays, defaultLine]
                }
                else return element
            })
        }
    }),
    on(deleteLine, (state, action) => {
        let newLinears: Linear[];
        if(state.linears[action.value.linearIndex].lines.length > 1) {
            newLinears = state.linears.map((element, index) => {
                if(index == action.value.linearIndex)
                return {
                    ...element,
                    lines: element.lines.filter((_, index) => index !== action.value.lineIndex)
                }
                else return element
            })
        }
        else {
            newLinears = state.linears.filter((_, index) => index !== action.value.linearIndex);
        }
        return {
            ...state,
            linears: newLinears
        }
    }),
    on(deleteRadius, (state, action) => {
        let newRadials: Radial[];
        if(state.radials[action.value.radialIndex].rays.length > 1) {
            newRadials = state.radials.map((element, index) => {
                if(index == action.value.radialIndex)
                return {
                    ...element,
                    rays: element.rays.filter((_, index) => index !== action.value.radiusIndex)
                }
                else return element
            })
        }
        else {
            newRadials = state.radials.filter((_, index) => index !== action.value.radialIndex);
        }
        return {
            ...state,
            radials: newRadials
        }
    })
)