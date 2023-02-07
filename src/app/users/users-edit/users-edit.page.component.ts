import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { HttpRequestState } from '../../shared/interfaces/http-request-state';
import { PocketBaseUser } from '../../shared/interfaces/user';
import { UsersStore } from '../data-access/users.store';
import { UsersEditStore } from './data-access/users-edit.store';
import { UsersEditFormComponent } from './ui/users-edit-form.component';

@Component({
  selector: 'usrm-users-edit',
  standalone: true,
  imports: [AsyncPipe, NgIf, UsersEditFormComponent],
  providers: [UsersEditStore],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <usrm-users-edit-form
        *ngIf="vm.userState === HttpRequestState.SUCCESS && vm.user"
        (editUser)="updateUser($event)"
        [user]="vm.user"
        [userEditState]="vm.userEditState"
      ></usrm-users-edit-form>
    </ng-container>
  `,
})
export class UsersEditPageComponent implements OnInit {
  private usersStore = inject(UsersStore);

  private activatedRoute = inject(ActivatedRoute);

  private usersEditStore = inject(UsersEditStore);

  readonly HttpRequestState = HttpRequestState;

  readonly vm$ = combineLatest([
    this.usersStore.user$,
    this.usersStore.httpRequestState$,
    this.usersEditStore.httpRequestState$,
  ]).pipe(
    map(([user, userState, userEditState]) => ({
      user,
      userState,
      userEditState,
    }))
  );

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.usersStore.loadUser(userId);
  }

  updateUser(usersData: Partial<PocketBaseUser>): void {
    this.usersEditStore.editUser(usersData);
  }
}
