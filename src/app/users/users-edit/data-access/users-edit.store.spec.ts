import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { UsersService } from '../../../shared/data-access/users.service';
import { HttpRequestState } from '../../../shared/interfaces/http-request-state';
import { USER_EXAMPLE } from '../../../shared/interfaces/user';

import { UsersEditStore } from './users-edit.store';

describe('UsersEditStore', () => {
  function setup(overwriteMock = {}) {
    TestBed.configureTestingModule({
      providers: [
        UsersEditStore,
        {
          provide: UsersService,
          useValue: {
            updateUserById: jest
              .fn()
              .mockReturnValue(of(HttpRequestState.SUCCESS)),
            ...overwriteMock,
          },
        },
      ],
    });

    const store = TestBed.inject(UsersEditStore);
    return { store };
  }

  it('should edit a user', fakeAsync(() => {
    const { store } = setup();

    store.editUser(USER_EXAMPLE);

    store.httpRequestState$.subscribe({
      next: (result) => expect(result).toEqual(HttpRequestState.SUCCESS),
    });

    tick();
  }));
});
