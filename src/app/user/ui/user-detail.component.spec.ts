import { render, screen } from '@testing-library/angular';
import { USER_EXAMPLE } from '../../shared/interfaces/user';

import { UserDetailComponent } from './user-detail.component';

describe('UserDetailComponent', () => {
  async function setup() {
    const { fixture } = await render(UserDetailComponent, {
      componentProperties: {
        user: USER_EXAMPLE,
      },
    });
    return {
      fixture,
    };
  }

  it('should compile', async () => {
    await setup();
    screen.getByRole('img', { name: /john doe/i });
    screen.getByRole('heading', { name: /john doe/i });
    screen.getByRole('button', { name: /edit/i });
  });
});
