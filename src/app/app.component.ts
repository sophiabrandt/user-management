import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'usrm-root',
  standalone: true,
  template: `
    <usrm-header></usrm-header>
    <usrm-home class="cover center"></usrm-home>
  `,
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent, HomeComponent],
})
export class AppComponent {}
