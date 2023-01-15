import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import PocketBase from 'pocketbase';
import { AppComponent } from './app/app.component';
import { POCKETBASE_CLIENT } from './app/shared/tokens/tokens';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    {
      provide: POCKETBASE_CLIENT,
      useValue: new PocketBase(environment.pocketbaseUrl),
    },
  ],
}).catch((err) => console.error(err));
