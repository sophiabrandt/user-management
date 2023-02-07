import { ActivatedRoute } from '@angular/router';
import { render } from '@testing-library/angular';
import { of } from 'rxjs';
import { HttpRequestState } from '../../shared/interfaces/http-request-state';
import { USER_EXAMPLE } from '../../shared/interfaces/user';
import { UsersStore } from '../data-access/users.store';
import { UsersEditStore } from './data-access/users-edit.store';

import { UsersEditPageComponent } from './users-edit.page.component';

describe('UsersEditPageComponent', () => {
  async function setup() {
    const { fixture } = await render(UsersEditPageComponent, {
      componentProviders: [
        {
          provide: UsersStore,
          useValue: {
            user$: of(USER_EXAMPLE),
            httpRequestState$: of(HttpRequestState.SUCCESS),
            loadUser: jest.fn(),
          },
        },
        {
          provide: UsersEditStore,
          useValue: {
            httpRequestState$: of(HttpRequestState.SUCCESS),
            editUser: jest.fn().mockResolvedValue(of(USER_EXAMPLE)),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jest.fn().mockReturnValue(USER_EXAMPLE.id),
              },
            },
          },
        },
      ],
    });
    return {
      fixture,
    };
  }

  it('should load the data for a user', async () => {
    const { fixture } = await setup();
    const usersStore = fixture.debugElement.injector.get(UsersStore);
    const spy = jest.spyOn(usersStore, 'loadUser');

    expect(spy).toHaveBeenCalledWith(USER_EXAMPLE.id);
  });

  it('should update a user', async () => {
    const { fixture } = await setup();
    const usersEditStore = fixture.debugElement.injector.get(UsersEditStore);
    const spy = jest.spyOn(usersEditStore, 'editUser');

    fixture.componentInstance.updateUser(USER_EXAMPLE);

    expect(spy).toHaveBeenCalledWith(USER_EXAMPLE);
  });
});
