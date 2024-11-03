import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction('[Auth] Login Success');
export const logout = createAction('[Auth] Logout');
export const checkAuthStatus = createAction('[Auth] Check Auth Status');
export const setAuthStatus = createAction(
  '[Auth] Set Auth Status',
  props<{ isAuthenticated: boolean }>()
);
