import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PocketBaseUser } from '../../../shared/interfaces/user';

@Component({
  selector: 'usrm-users-edit-form',
  standalone: true,
  imports: [],
  template: `
    <p>users-edit-form works!</p>
    <p>{{ user.name }}</p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersEditFormComponent {
  @Input() user: PocketBaseUser;
}
