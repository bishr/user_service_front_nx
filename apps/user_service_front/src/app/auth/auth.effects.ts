import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import {
  loginSuccess,
  logout,
  checkAuthStatus,
  setAuthStatus,
} from './auth.actions';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        switchMap(() => this.authService.logout()),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  checkAuthStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAuthStatus),
      switchMap(() => this.authService.checkAuthStatus()), // API request to check status
      map((isAuthenticated) => setAuthStatus({ isAuthenticated })),
      catchError(() => of(setAuthStatus({ isAuthenticated: false })))
    )
  );
}
