import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UsersService } from '../../shared/data-access/users.service';
import { USER_EXAMPLE } from '../../shared/interfaces/user';

import { UserStore } from './user.store';

describe('UserStore', () => {
  function setup(overwriteMock = {}) {
    TestBed.configureTestingModule({
      providers: [
        UserStore,
        {
          provide: UsersService,
          useValue: {
            getById: jest.fn().mockReturnValue(of(USER_EXAMPLE)),
            ...overwriteMock,
          },
        },
      ],
    });

    const store = TestBed.inject(UserStore);
    return { store };
  }

  it('should compile', () => {
    const { store } = setup();
    expect(store).toBeTruthy();
  });
});
