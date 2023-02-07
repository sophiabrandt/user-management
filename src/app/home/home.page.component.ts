import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { HttpRequestState } from '../shared/interfaces/http-request-state';
import { HeaderComponent } from '../shared/ui/header/header.component';
import { HomeStore } from './data-access/home.store';
import { UsersListComponent } from './ui/user-list/users-list.component';

@Component({
  selector: 'usrm-home',
  standalone: true,
  imports: [NgIf, AsyncPipe, HeaderComponent, UsersListComponent],
  template: `
    <usrm-header></usrm-header>
    <ng-container *ngIf="vm$ | async as vm">
      <usrm-users-list
        *ngIf="vm.httpRequestState === HttpRequestState.SUCCESS"
        [users]="vm.users"
      ></usrm-users-list>
    </ng-container>
  `,
  providers: [HomeStore],
})
export class HomePageComponent implements OnInit {
  private store = inject(HomeStore);

  readonly HttpRequestState = HttpRequestState;

  readonly vm$ = combineLatest([
    this.store.users$,
    this.store.httpRequestState$,
  ]).pipe(map(([users, httpRequestState]) => ({ users, httpRequestState })));

  ngOnInit(): void {
    this.store.loadUsers();
  }
}
