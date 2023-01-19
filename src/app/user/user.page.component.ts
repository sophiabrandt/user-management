import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { HttpStatus } from '../shared/interfaces/http-status';
import { HeaderComponent } from '../shared/ui/header/header.component';
import { UserStore } from './data-access/user.store';
import { UserDetailComponent } from './ui/user-detail.component';

@Component({
  selector: 'usrm-user',
  standalone: true,
  imports: [NgIf, AsyncPipe, UserDetailComponent, HeaderComponent],
  template: `
    <usrm-header></usrm-header>

    <ng-container *ngIf="vm$ | async as vm">
      <usrm-user-detail
        *ngIf="vm.status === Status.SUCCESS && vm.user"
        [user]="vm.user"
        class="center cover"
      ></usrm-user-detail>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserStore],
})
export class UserPageComponent implements OnInit {
  private store = inject(UserStore);

  activatedRoute = inject(ActivatedRoute);

  Status = HttpStatus;

  readonly vm$ = combineLatest([this.store.user$, this.store.status$]).pipe(
    map(([user, status]) => ({ user, status }))
  );

  ngOnInit(): void {
    this.store.loadUser();
  }
}
