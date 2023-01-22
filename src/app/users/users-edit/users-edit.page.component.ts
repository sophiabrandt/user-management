import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { HttpRequestState } from '../../shared/interfaces/http-request-state';
import { UsersStore } from '../data-access/users.store';
import { UsersEditFormComponent } from './ui/users-edit-form.component';

@Component({
  selector: 'usrm-users-edit',
  standalone: true,
  imports: [AsyncPipe, NgIf, UsersEditFormComponent],
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <usrm-users-edit-form
        *ngIf="vm.httpRequestState === HttpRequestState.SUCCESS && vm.user"
        [user]="vm.user"
      ></usrm-users-edit-form>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersEditPageComponent implements OnInit {
  private usersStore = inject(UsersStore);
  private activatedRoute = inject(ActivatedRoute);

  HttpRequestState = HttpRequestState;

  readonly vm$ = combineLatest([
    this.usersStore.user$,
    this.usersStore.httpRequestState$,
  ]).pipe(map(([user, httpRequestState]) => ({ user, httpRequestState })));

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.usersStore.loadUser(userId);
  }
}
