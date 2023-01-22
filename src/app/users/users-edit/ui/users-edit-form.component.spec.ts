import { render } from '@testing-library/angular';
import { USER_EXAMPLE } from '../../../shared/interfaces/user';

import { UsersEditFormComponent } from './users-edit-form.component';

describe('UsersEditFormComponent', () => {
  async function setup() {
    const { fixture } = await render(UsersEditFormComponent, {
      componentProperties: {
        user: USER_EXAMPLE,
      },
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
