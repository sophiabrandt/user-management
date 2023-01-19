import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'usrm-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent {
  @Input() user!: User;
}
