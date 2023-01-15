import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HomeComponent],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
