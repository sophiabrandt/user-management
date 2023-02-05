import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { USER_EXAMPLE } from '../../../shared/interfaces/user';

import { UsersEditStore } from './users-edit.store';

describe('UsersEditStore', () => {
  function setup(overwriteMock = {}) {
    TestBed.configureTestingModule({
      providers: [
        UsersEditStore,
        {
          provide: UsersEditStore,
          useValue: {
            updateById: jest.fn().mockReturnValue(of(USER_EXAMPLE)),
            ...overwriteMock,
          },
        },
      ],
    });

    const store = TestBed.inject(UsersEditStore);
    return { store };
  }

  it('should compile', () => {
    const { store } = setup();
    expect(store).toBeTruthy();
  });
});
