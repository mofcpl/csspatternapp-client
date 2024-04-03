import { createAction, props } from "@ngrx/store";
import { PatchUser, User, registerError } from "../../models/user.model";

export const loadAuth = createAction(
    '[Auth] Load authorization data from storage',
)

export const logout = createAction(
    '[Auth] Logout',
)

export const signinStart = createAction(
    '[Auth] Login start',
    props<{value: { email: string, password: string }}>()
)

export const authenticateFail = createAction(
    '[Auth] Login Fail',
    props<{value: registerError}>()
)

export const signupStart = createAction(
    '[Auth] Signup Start',
    props<{value: { name: string, email: string, password: string}}>()
)

export const signinSuccess = createAction(
    '[Auth] Signin success',
    props<{ value: User}>()
)

export const signupSuccess = createAction(
    '[Auth] Signup success'
)

export const clearError = createAction(
    '[Auth] Clear error',
    props<{value: { name: string, email: string, password: string}}>()
)

export const userPatchStart = createAction(
    '[Auth] Patch user start',
    props<{value: PatchUser}>()
)

export const userPatchSuccess = createAction(
    '[Auth] Patch user success',
    props<{value: PatchUser}>()
)