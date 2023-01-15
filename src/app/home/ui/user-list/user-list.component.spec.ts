import { render, screen } from '@testing-library/angular';
import { USER_EXAMPLE } from '../../../shared/interfaces/user';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  async function setup() {
    const { fixture } = await render(UserListComponent, {
      componentInputs: {
        users: [USER_EXAMPLE],
      },
    });
    return {
      fixture,
    };
  }

  it('should show a list of users', async () => {
    await setup();
    screen.getByRole('columnheader', { name: /name/i });
    screen.getByRole('columnheader', { name: /email/i });
    screen.getByRole('columnheader', { name: /job description/i });
    screen.getByRole('columnheader', { name: /location/i });
    screen.getByRole('cell', { name: /test tester/i });
  });
});
