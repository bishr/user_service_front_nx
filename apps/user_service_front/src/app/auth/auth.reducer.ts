import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout, setAuthStatus } from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state) => {
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
    return { ...state, isAuthenticated: true };
  }),
  on(logout, (state) => {
    localStorage.setItem('isAuthenticated', JSON.stringify(false));
    return { ...state, isAuthenticated: false };
  }),
  on(setAuthStatus, (state, { isAuthenticated }) => ({
    ...state,
    isAuthenticated,
  }))
);
