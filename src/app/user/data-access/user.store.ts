import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { UsersService } from '../../shared/data-access/users.service';
import {
  HttpStatus,
  HttpStatusType,
} from '../../shared/interfaces/http-status';
import { User } from '../../shared/interfaces/user';

interface UserState {
  user: User | undefined;
  status: HttpStatusType;
}
@Injectable()
export class UserStore extends ComponentStore<UserState> {
  private usersService = inject(UsersService);

  readonly user$ = this.select((state) => state.user);

  readonly status$ = this.select((state) => state.status);

  readonly loadUser = this.effect(($) => {
    return $.pipe(
      tap(() => this.patchState({ status: HttpStatus.IN_PROGRESS })),
      switchMap(() =>
        this.usersService.getbyId('').pipe(
          tapResponse(
            (user) => this.patchState({ user, status: HttpStatus.SUCCESS }),
            (err) => {
              console.error(err);
              this.patchState({ status: HttpStatus.ERROR });
            }
          ),
          catchError(() => EMPTY)
        )
      )
    );
  });

  constructor() {
    super({ user: undefined, status: HttpStatus.PENDING });
  }
}
