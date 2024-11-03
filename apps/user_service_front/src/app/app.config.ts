import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './interceptor/jwt.interceptor';
//import { AppStoreModule } from './app-store.module';
import { provideRouter } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from './auth/auth.effects';
import { authReducer } from './auth/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      StoreModule.forRoot({ auth: authReducer }),
      EffectsModule.forRoot([AuthEffects]), // Ensure EffectsModule initialization
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false })
    ), // Using AppStoreModule only
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};

/*import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './interceptor/jwt.interceptor';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      StoreModule.forRoot({ auth: authReducer }),
      EffectsModule.forRoot([AuthEffects]),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false })
    ),
    //provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
  ]
};*/
