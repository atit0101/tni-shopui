import { ApplicationConfig, ErrorHandler, importProvidersFrom, NgModule, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { StoreModule, provideStore } from '@ngrx/store';
import { productReducer } from './store/reducer';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes), provideClientHydration(),
    provideStore({ router: routerReducer }),
    importProvidersFrom(
      RouterModule.forRoot(routes),
      StoreModule.forRoot({
        product: productReducer,
      }),
    )
  ]
};
