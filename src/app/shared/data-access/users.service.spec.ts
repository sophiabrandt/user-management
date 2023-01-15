import { fakeAsync, TestBed } from '@angular/core/testing';
import { lastValueFrom, of, throwError } from 'rxjs';
import { USER_EXAMPLE } from '../interfaces/user';
import { POCKETBASE_CLIENT } from '../tokens/tokens';

import { UsersService } from './users.service';

describe('UsersService', () => {
  function setup(overwriteMock = {}) {
    const pocketBaseMock = {
      collection: () => pocketBaseMock,
      getFullList: jest.fn().mockReturnValue(of([USER_EXAMPLE])),
      ...overwriteMock,
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: POCKETBASE_CLIENT,
          useValue: pocketBaseMock,
        },
      ],
    });

    const service = TestBed.inject(UsersService);
    return { service };
  }

  it("should fetch all users from table 'usrm_users' from PocketBase", fakeAsync(() => {
    const { service } = setup();
    const spy = jest.spyOn(service, 'getAll');

    expect(lastValueFrom(service.getAll())).resolves.toStrictEqual([
      USER_EXAMPLE,
    ]);
    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('should handle errors', fakeAsync(() => {
    const { service } = setup({
      getFullList: jest
        .fn()
        .mockReturnValue(throwError(() => new Error('my error message'))),
    });

    service.getAll().subscribe(null, (error) => {
      expect(error).toEqual(
        new Error('Server returned status undefined: my error message')
      );
    });
  }));
});
