import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { catchError, EMPTY, switchMap } from 'rxjs';
import { UsersService } from '../../shared/data-access/users.service';
import { User } from '../../shared/interfaces/user';

export interface HomeState {
  users: User[];
}

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  private usersService = inject(UsersService);

  readonly users$ = this.select((state) => state.users);

  readonly loadUsers = this.effect(($) => {
    return $.pipe(
      switchMap(() =>
        this.usersService.getAll().pipe(
          tapResponse(
            (users) => this.patchState({ users }),
            (err) => console.error(err)
          ),
          catchError(() => EMPTY)
        )
      )
    );
  });

  constructor() {
    super({
      users: [],
    });
  }
}
