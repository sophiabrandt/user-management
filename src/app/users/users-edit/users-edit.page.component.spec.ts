import { render } from '@testing-library/angular';
import { of } from 'rxjs';
import { HttpRequestState } from '../../shared/interfaces/http-request-state';
import { USER_EXAMPLE } from '../../shared/interfaces/user';
import { UsersStore } from '../data-access/users.store';

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
      ],
    });
    return {
      fixture,
    };
  }

  it('should compile', async () => {
    const { fixture } = await setup();
    expect(fixture).toBeTruthy();
  });
});
