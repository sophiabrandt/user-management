import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './home/home.page.component';
import { HeaderComponent } from './shared/ui/header/header.component';

@Component({
  selector: 'usrm-root',
  standalone: true,
  template: ` <router-outlet></router-outlet> `,
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent, HomePageComponent, RouterOutlet],
})
export class AppComponent {}
