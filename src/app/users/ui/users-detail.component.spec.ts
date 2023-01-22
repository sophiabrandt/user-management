import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { HomePageComponent } from '../../home/home.page.component';
import { USER_EXAMPLE } from '../../shared/interfaces/user';

import { UsersDetailComponent } from './users-detail.component';

describe('UsersDetailComponent', () => {
  async function setup() {
    const { fixture } = await render(UsersDetailComponent, {
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

  xit('should go back to home back on clicking "Go back" button', async () => {
    await setup();

    expect(
      screen.queryByRole('columnheader', { name: /name/i })
    ).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('link', { name: /Go back/i }));
    expect(
      await screen.findByRole('columnheader', { name: /name/i })
    ).toBeInTheDocument();
  });
});
