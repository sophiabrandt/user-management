import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { USER_EXAMPLE } from '../shared/interfaces/user';
import { HomeStore } from './data-access/home.store';
import { HomePageComponent } from './home.page.component';

describe('HomeComponent', () => {
  async function setup() {
    const { fixture } = await render(HomePageComponent, {
      providers: [
        {
          provide: HomeStore,
          useValue: {
            loadUsers: jest.fn(),
            users$: of([USER_EXAMPLE]),
          },
        },
      ],
    });
    return {
      fixture,
    };
  }

  it('should render the header and a home table', async () => {
    await setup();

    screen.getByRole('heading', { name: /user management/i });
    screen.getByRole('columnheader', { name: /name/i });
    screen.getByRole('columnheader', { name: /email/i });
    screen.getByRole('columnheader', { name: /job description/i });
    screen.getByRole('columnheader', { name: /location/i });
  });
});
