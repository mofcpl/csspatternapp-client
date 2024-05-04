import { User } from "./user.model";

export interface ApplicationState {
    zoom: number;
    repeat: boolean;
    selectedIndex: number;
    projectIndex: number | null;
    user: User | null;
    loading: boolean;
    error: boolean;
}