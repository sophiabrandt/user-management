import { NgFor, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'usrm-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  imports: [NgFor, TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @Input() users!: User[];
}
