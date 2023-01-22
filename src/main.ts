import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  PreloadAllModules,
  provideRouter,
  Routes,
  withDebugTracing,
  withPreloading,
} from '@angular/router';
import PocketBase from 'pocketbase';
import { AppComponent } from './app/app.component';
import { POCKETBASE_CLIENT } from './app/shared/tokens/tokens';
import { environment } from './environments/environment';

const APP_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./app/home/home.page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./app/users/users.routes').then((m) => m.USERS_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(
      APP_ROUTES,
      withPreloading(PreloadAllModules),
      withDebugTracing()
    ),
    {
      provide: POCKETBASE_CLIENT,
      useValue: new PocketBase(environment.pocketbaseUrl),
    },
  ],
}).catch((err) => console.error(err));
