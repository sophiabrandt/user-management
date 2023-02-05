import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { UsersService } from '../../../shared/data-access/users.service';
import {
  HttpRequestState,
  HttpRequestStateType,
} from '../../../shared/interfaces/http-request-state';
import { PocketBaseUser } from '../../../shared/interfaces/user';

interface UsersEditState {
  user: Partial<PocketBaseUser> | undefined;
  httpRequestState: HttpRequestStateType;
}

@Injectable()
export class UsersEditStore extends ComponentStore<UsersEditState> {
  private usersService = inject(UsersService);

  readonly httpRequestState$ = this.select((state) => state.httpRequestState);

  readonly editUser = this.effect(
    (usersData$: Observable<Partial<PocketBaseUser>>) => {
      return usersData$.pipe(
        tap(() =>
          this.patchState({ httpRequestState: HttpRequestState.IN_PROGRESS })
        ),
        switchMap((usersData) =>
          this.usersService.updateUserById(usersData).pipe(
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
    }
  );

  constructor() {
    super({
      user: undefined,
      httpRequestState: HttpRequestState.PENDING,
    });
  }
}
