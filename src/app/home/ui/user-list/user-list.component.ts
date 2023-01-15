import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'usrm-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {}
