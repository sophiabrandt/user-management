import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { HttpRequestState } from '../shared/interfaces/http-request';
import { User } from '../shared/interfaces/user';
import { HeaderComponent } from '../shared/ui/header/header.component';
import { HomeStore } from './data-access/home.store';
import { UserListComponent } from './ui/user-list/user-list.component';

@Component({
  selector: 'usrm-home',
  standalone: true,
  imports: [NgIf, AsyncPipe, HeaderComponent, UserListComponent],
  template: `
    <usrm-header></usrm-header>
    <ng-container *ngIf="usersDataState$ | async as usersDataState">
      <usrm-user-list
        class="center cover"
        *ngIf="usersDataState.value"
        [users]="usersDataState.value"
      ></usrm-user-list>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore],
})
export class HomePageComponent implements OnInit {
  private store = inject(HomeStore);

  readonly usersDataState$: Observable<HttpRequestState<User[]>> =
    this.store.users$.pipe(
      map((value) => ({ isLoading: false, value })),
      catchError((error) => of({ isLoading: false, error })),
      startWith({ isLoading: true })
    );

  ngOnInit(): void {
    this.store.loadUsers();
  }
}
