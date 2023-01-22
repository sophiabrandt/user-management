import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/ui/header/header.component';

@Component({
  selector: 'usrm-users-shell',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <usrm-header></usrm-header>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersShellComponent {}
