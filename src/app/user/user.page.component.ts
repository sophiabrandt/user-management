import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { UserDetailComponent } from './ui/user-detail.component';

@Component({
  selector: 'usrm-user',
  standalone: true,
  imports: [UserDetailComponent],
  template: `<usrm-user-detail></usrm-user-detail>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent {
  activatedRoute = inject(ActivatedRoute);

  private userId$ = this.activatedRoute.paramMap
    .pipe(tap((params) => console.log(params.get('id'))))
    .subscribe();
}
