import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { HttpRequestState } from '../shared/interfaces/http-request-state';
import { HeaderComponent } from '../shared/ui/header/header.component';
import { HomeStore } from './data-access/home.store';
import { UserListComponent } from './ui/user-list/user-list.component';

@Component({
  selector: 'usrm-home',
  standalone: true,
  imports: [NgIf, AsyncPipe, HeaderComponent, UserListComponent],
  template: `
    <usrm-header></usrm-header>
    <ng-container *ngIf="vm$ | async as vm">
      <usrm-user-list
        *ngIf="vm.httpRequestState === HttpRequestState.SUCCESS"
        [users]="vm.users"
        class="center cover"
      ></usrm-user-list>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore],
})
export class HomePageComponent implements OnInit {
  private store = inject(HomeStore);

  HttpRequestState = HttpRequestState;

  readonly vm$ = combineLatest([
    this.store.users$,
    this.store.httpRequestState$,
  ]).pipe(map(([users, httpRequestState]) => ({ users, httpRequestState })));

  ngOnInit(): void {
    this.store.loadUsers();
  }
}
