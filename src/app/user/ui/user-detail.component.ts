import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'usrm-user-detail',
  standalone: true,
  imports: [],
  template: ` <p>user-detail works!</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent {}
