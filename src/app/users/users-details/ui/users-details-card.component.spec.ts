import { render, screen } from '@testing-library/angular';
import { HomePageComponent } from '../../../home/home.page.component';
import { USER_EXAMPLE } from '../../../shared/interfaces/user';

import { UsersDetailsCardComponent } from './users-details-card.component';

describe('UsersDetailsCardComponent', () => {
  async function setup() {
    const { fixture } = await render(UsersDetailsCardComponent, {
      imports: [HomePageComponent],
      componentProperties: {
        user: USER_EXAMPLE,
      },
      routes: [
        {
          path: '',
          children: [{ path: 'home', component: HomePageComponent }],
        },
      ],
    });
    return {
      fixture,
    };
  }

  it('should show user details', async () => {
    await setup();
    screen.getByRole('img', { name: /john doe/i });
    screen.getByRole('heading', { name: /john doe/i });
    screen.getByRole('button', { name: /edit/i });
  });
});
