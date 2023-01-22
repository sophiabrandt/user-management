import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { USER_EXAMPLE } from '../../../shared/interfaces/user';
import { UsersDetailComponent } from '../../../users/ui/users-detail.component';

import { UsersListComponent } from './users-list.component';

describe('UserListComponent', () => {
  async function setup() {
    const { fixture } = await render(UsersListComponent, {
      imports: [UsersDetailComponent],
      componentInputs: {
        users: [USER_EXAMPLE],
      },
      routes: [
        {
          path: '',
          children: [{ path: 'users/:id', component: UsersDetailComponent }],
        },
      ],
    });
    return { fixture };
  }

  it('should show a list of users', async () => {
    await setup();
    screen.getByRole('columnheader', { name: /name/i });
    screen.getByRole('columnheader', { name: /email/i });
    screen.getByRole('columnheader', { name: /job description/i });
    screen.getByRole('columnheader', { name: /location/i });
    screen.getByRole('cell', { name: /john doe/i });
  });

  xit('should route to users detail page on button click', async () => {
    await setup();

    expect(
      screen.queryByRole('img', { name: /john doe/i })
    ).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('link', { name: /details/i }));
    expect(
      await screen.findByRole('img', { name: /john doe/i })
    ).toBeInTheDocument();
  });
});
