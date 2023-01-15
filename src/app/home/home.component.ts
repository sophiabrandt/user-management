import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { UserListComponent } from './ui/user-list/user-list.component';

@Component({
  selector: 'usrm-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, UserListComponent],
  template: `
    <usrm-header></usrm-header>
    <usrm-user-list></usrm-user-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
