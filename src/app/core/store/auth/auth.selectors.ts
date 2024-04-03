import { authState } from "./auth.reducer";


export const selectLoadingStatus = (state: {auth: authState}) => state.auth.loading;

export const selectSignupStatus = (state: {auth: authState}) => state.auth.signupSuccesfull;

export const selectErrors = (state: {auth: authState}) => state.auth.authError;

export const selectUser = (state: {auth: authState}) => state.auth.user;

