import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../auth/auth.model';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store
      .select((state) => state.auth.isAuthenticated)
      .pipe(
        map((isAuthenticated) => {
          if (!isAuthenticated) {
            this.router.navigate(['/login']);
          }
          return isAuthenticated;
        })
      );
  }
}

/*export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localData =   localStorage.getItem('uName');
  if(localData != null) {
    return true;
  } else {
    router.navigateByUrl("login");
    return false;
  }
};*/
