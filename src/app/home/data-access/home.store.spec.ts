import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UsersService } from '../../shared/data-access/users.service';
import { USER_EXAMPLE } from '../../shared/interfaces/user';

import { HomeStore } from './home.store';

describe('HomeStore', () => {
  function setup(overwriteMock = {}) {
    TestBed.configureTestingModule({
      providers: [
        HomeStore,
        {
          provide: UsersService,
          useValue: {
            getAll: jest.fn().mockReturnValue(of([USER_EXAMPLE])),
            ...overwriteMock,
          },
        },
      ],
    });

    const store = TestBed.inject(HomeStore);
    return { store };
  }

  it('should initially return no users', fakeAsync(() => {
    const { store } = setup();

    store.users$.subscribe({
      next: (result) => expect(result).toEqual([]),
    });
    tick();
  }));

  it('should load users from the user service', fakeAsync(() => {
    const { store } = setup();

    store.loadUsers();

    store.users$.subscribe({
      next: (result) => expect(result).toEqual([USER_EXAMPLE]),
    });
    tick();
  }));

  it('should return nothing if the user service throws an error', fakeAsync(() => {
    const logError = console.error;
    console.error = jest.fn();
    const { store } = setup({
      getAll: jest
        .fn()
        .mockReturnValue(throwError(() => new Error('my error message'))),
    });

    store.loadUsers();

    store.users$.subscribe({
      next: (result) => expect(result).toEqual([]),
    });
    tick();

    console.error = logError;
  }));
});
