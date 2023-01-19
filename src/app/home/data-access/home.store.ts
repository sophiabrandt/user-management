import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { UsersService } from '../../shared/data-access/users.service';
import {
  HttpRequestState,
  HttpRequestStateType,
} from '../../shared/interfaces/http-request-state';
import { User } from '../../shared/interfaces/user';

interface HomeState {
  users: User[];
  httpRequestState: HttpRequestStateType;
}

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  private usersService = inject(UsersService);

  readonly users$ = this.select((state) => state.users);

  readonly httpRequestState$ = this.select((state) => state.httpRequestState);

  readonly loadUsers = this.effect(($) => {
    return $.pipe(
      tap(() =>
        this.patchState({ httpRequestState: HttpRequestState.IN_PROGRESS })
      ),
      switchMap(() =>
        this.usersService.getAll().pipe(
          tapResponse(
            (users) =>
              this.patchState({
                users,
                httpRequestState: HttpRequestState.SUCCESS,
              }),
            (err) => {
              console.error(err);
              this.patchState({ httpRequestState: HttpRequestState.ERROR });
            }
          ),
          catchError(() => EMPTY)
        )
      )
    );
  });

  constructor() {
    super({
      users: [],
      httpRequestState: HttpRequestState.PENDING,
    });
  }
}
