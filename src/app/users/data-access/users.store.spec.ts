import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UsersService } from '../../shared/data-access/users.service';
import { USER_EXAMPLE } from '../../shared/interfaces/user';

import { UsersStore } from './users.store';

describe('UsersStore', () => {
  function setup(overwriteMock = {}) {
    TestBed.configureTestingModule({
      providers: [
        UsersStore,
        {
          provide: UsersService,
          useValue: {
            getById: jest.fn().mockReturnValue(of(USER_EXAMPLE)),
            ...overwriteMock,
          },
        },
      ],
    });

    const store = TestBed.inject(UsersStore);
    return { store };
  }

  it('should load a user from the user service', fakeAsync(async () => {
    const { store } = setup();

    store.loadUser(USER_EXAMPLE.id);

    store.user$.subscribe({
      next: (result) => expect(result).toEqual(USER_EXAMPLE),
    });
    tick();
  }));

  it('should return undefined if the user service throws an error', fakeAsync(() => {
    const logError = console.error;
    console.error = jest.fn();
    const { store } = setup({
      getById: jest
        .fn()
        .mockReturnValue(throwError(() => new Error('my error message'))),
    });

    store.loadUser(USER_EXAMPLE.id);

    store.user$.subscribe({
      next: (result) => expect(result).toEqual(undefined),
    });
    tick();

    console.error = logError;
  }));
});
