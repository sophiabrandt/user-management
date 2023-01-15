import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { HttpRequestState } from '../shared/interfaces/http-request';
import { User } from '../shared/interfaces/user';
import { HomeStore } from './data-access/home.store';
import { UserListComponent } from './ui/user-list/user-list.component';

@Component({
  selector: 'usrm-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, UserListComponent],
  template: `
    <ng-container *ngIf="usersDataState$ | async as usersDataState">
      <usrm-user-list
        *ngIf="usersDataState.value"
        [users]="usersDataState.value"
      ></usrm-user-list>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore],
})
export class HomeComponent implements OnInit {
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
