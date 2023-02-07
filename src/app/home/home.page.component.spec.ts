import { fakeAsync } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { HttpRequestState } from '../shared/interfaces/http-request-state';
import { USER_EXAMPLE } from '../shared/interfaces/user';
import { HomeStore } from './data-access/home.store';
import { HomePageComponent } from './home.page.component';

describe('HomeComponent', () => {
  async function setup() {
    const { fixture } = await render(HomePageComponent, {
      componentProviders: [
        {
          provide: HomeStore,
          useValue: {
            users$: of([USER_EXAMPLE]),
            httpRequestState$: of(HttpRequestState.SUCCESS),
            loadUsers: jest.fn(),
          },
        },
      ],
    });
    return {
      fixture,
    };
  }

  it('should render the header and the users table', async () => {
    await setup();

    screen.getByRole('heading', { name: /user management/i });
    screen.getByRole('table');
    screen.getByRole('columnheader', { name: /name/i });
  });

  it('should load users data', fakeAsync(async () => {
    const { fixture } = await setup();
    const homeStore = fixture.debugElement.injector.get(HomeStore);
    const spy = jest.spyOn(homeStore, 'loadUsers');

    expect(spy).toHaveBeenCalledTimes(1);
  }));
});
