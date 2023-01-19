import { fakeAsync, tick } from '@angular/core/testing';
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

  it('should render the header', async () => {
    await setup();

    screen.getByRole('heading', { name: /user management/i });
  });

  it('should render a user table', fakeAsync(async () => {
    const { fixture } = await setup();
    fixture.componentInstance.ngOnInit();

    screen.getByRole('heading', { name: /user management/i });
    fixture.componentInstance.vm$.subscribe((result) => {
      expect(result.users).toEqual([USER_EXAMPLE]);
      expect(result.httpRequestState).toEqual(HttpRequestState.SUCCESS);
    });
    screen.getByRole('columnheader', { name: /name/i });
    screen.getByRole('columnheader', { name: /email/i });
    screen.getByRole('columnheader', { name: /job description/i });
    screen.getByRole('columnheader', { name: /location/i });
    screen.getByRole('cell', { name: /test@test.com/i });

    tick();
  }));
});
