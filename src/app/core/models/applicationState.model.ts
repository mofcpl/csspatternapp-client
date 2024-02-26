import { EntityState } from "@ngrx/entity";

export interface LayerSettings {
    visible: boolean;
    grid: boolean;
}

export interface ApplicationState {
    zoom: number;
    grid: boolean;
    index: number;
    repeat: boolean;
    selectedIndex: number;
    layerSettings: EntityState<LayerSettings>
}


