import { createReducer, on } from "@ngrx/store";
import { User, registerError } from "../../models/user.model";
import { authenticateFail, clearError, signinStart, logout, signupStart, signupSuccess, signinSuccess, userPatchStart, userPatchSuccess } from "./auth.actions";
import { NonNullableFormBuilder } from "@angular/forms";


export interface authState {
    user: User | null;
    authError: null | registerError,
    signupSuccesfull: boolean,
    loading: boolean;
}

const initialState: authState = {
    user: null,
    authError: null,
    loading: false,
    signupSuccesfull: false
};

export const authReducer = createReducer(
    initialState,
    on(logout, (state, action) => {
        return {
            ...state,
            user: null
        }
    }),
    on(signinStart, (state, action) => {
        return {
            ...state,
            authError: null,
            loading: true
        }
    }),
    on(signupStart, (state, action) => {
        return {
            ...state,
            authError: null,
            loading: true
        }
    }),
    on(authenticateFail, (state, action) => {
        return {
            ...state,
            authError: action.value,
            loading: false
        }
    }),
    on(clearError, (state, action) => {
        return {
            ...state,
            authError: null
        }
    }),
    on(signupSuccess, (state, action) => {
        return {
            ...state,
            signupSuccesfull: true,
            loading: false
        }
    }),
    on(signinSuccess, (state, action) => {
        return {
            ...state,
            user: action.value,
            loading: false
        }
    }),
    on(userPatchStart, (state, action) => {
        return {
            ...state,
            authError: null,
            loading: true
        }
    }),
    on(userPatchSuccess, (state, action) => {
        const propsToPatch = Object.fromEntries(Object.entries(action.value).filter(([_, v]) => v != null));
        const user = { ...state.user, ...propsToPatch }

        return {
            ...state,
            loading: false,
            authError: null,
            user: user as User
        } 
    }),
)