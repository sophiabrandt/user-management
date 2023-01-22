import { fakeAsync, tick } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { HttpRequestState } from '../shared/interfaces/http-request-state';
import { USER_EXAMPLE } from '../shared/interfaces/user';
import { UsersStore } from './data-access/users.store';

import { UsersPageComponent } from './users.page.component';

describe('UsersComponent', () => {
  async function setup() {
    const { fixture } = await render(UsersPageComponent, {
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

  it('should render the table with users', fakeAsync(async () => {
    const { fixture } = await setup();

    fixture.componentInstance.vm$.subscribe((result) => {
      expect(result.user).toEqual(USER_EXAMPLE);
      expect(result.httpRequestState).toEqual(HttpRequestState.SUCCESS);
    });
    screen.getByRole('img', { name: /john doe/i });
    screen.getByRole('heading', { name: /john doe/i });
    screen.getByRole('button', { name: /edit/i });

    tick();
  }));
});
