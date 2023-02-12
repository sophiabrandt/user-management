import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { UsersService } from '../../../shared/data-access/users.service';
import {
  HttpRequestState,
  HttpRequestStateType,
} from '../../../shared/interfaces/http-request-state';
import { PocketBaseUser } from '../../../shared/interfaces/user';

interface UsersEditState {
  httpRequestState: HttpRequestStateType;
}

@Injectable()
export class UsersEditStore extends ComponentStore<UsersEditState> {
  private usersService = inject(UsersService);

  private router = inject(Router);

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
              () => {
                this.patchState({
                  httpRequestState: HttpRequestState.SUCCESS,
                });
                this.router.navigate(['/home']);
              },
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
      httpRequestState: HttpRequestState.PENDING,
    });
  }
}
