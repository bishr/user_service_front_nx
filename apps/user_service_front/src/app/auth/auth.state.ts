import { AuthState } from './auth.model';

export const initialAuthState: AuthState = {
  isAuthenticated: JSON.parse(
    localStorage.getItem('isAuthenticated') || 'false'
  ),
  token: null,
};
