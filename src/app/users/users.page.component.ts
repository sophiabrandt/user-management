import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { HttpRequestState } from '../shared/interfaces/http-request-state';
import { HeaderComponent } from '../shared/ui/header/header.component';
import { UsersStore } from './data-access/users.store';
import { UsersDetailComponent } from './ui/users-detail.component';

@Component({
  selector: 'usrm-users',
  standalone: true,
  imports: [NgIf, AsyncPipe, UsersDetailComponent, HeaderComponent],
  template: `
    <usrm-header></usrm-header>
    <ng-container *ngIf="vm$ | async as vm">
      <usrm-users-detail
        *ngIf="vm.httpRequestState === HttpRequestState.SUCCESS && vm.user"
        [user]="vm.user"
      ></usrm-users-detail>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersStore],
})
export class UsersPageComponent implements OnInit {
  private store = inject(UsersStore);

  private activatedRoute = inject(ActivatedRoute);

  HttpRequestState = HttpRequestState;

  readonly vm$ = combineLatest([
    this.store.user$,
    this.store.httpRequestState$,
  ]).pipe(map(([user, httpRequestState]) => ({ user, httpRequestState })));

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.store.loadUser(userId);
  }
}
