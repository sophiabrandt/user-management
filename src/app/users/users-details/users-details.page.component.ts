import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { HttpRequestState } from '../../shared/interfaces/http-request-state';
import { HeaderComponent } from '../../shared/ui/header/header.component';
import { UsersStore } from '../data-access/users.store';
import { UsersDetailsCardComponent } from './ui/users-details-card.component';

@Component({
  selector: 'usrm-users-details',
  standalone: true,
  imports: [NgIf, AsyncPipe, UsersDetailsCardComponent, HeaderComponent],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <usrm-users-details-card
        *ngIf="vm.httpRequestState === HttpRequestState.SUCCESS && vm.user"
        [user]="vm.user"
      ></usrm-users-details-card>
    </ng-container>
  `,
})
export class UsersDetailsPageComponent implements OnInit {
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
