import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { UsersService } from '../../shared/data-access/users.service';
import {
  HttpRequestState,
  HttpRequestStateType,
} from '../../shared/interfaces/http-request-state';
import { User } from '../../shared/interfaces/user';

interface UserState {
  user: User | undefined;
  httpRequestState: HttpRequestStateType;
}
@Injectable()
export class UserStore extends ComponentStore<UserState> {
  private usersService = inject(UsersService);

  readonly user$ = this.select((state) => state.user);

  readonly httpRequestState$ = this.select((state) => state.httpRequestState);

  readonly loadUser = this.effect(($) => {
    return $.pipe(
      tap(() =>
        this.patchState({ httpRequestState: HttpRequestState.IN_PROGRESS })
      ),
      switchMap(() =>
        this.usersService.getbyId('').pipe(
          tapResponse(
            (user) =>
              this.patchState({
                user,
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
    super({ user: undefined, httpRequestState: HttpRequestState.PENDING });
  }
}
