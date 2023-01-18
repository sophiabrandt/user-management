import { render } from '@testing-library/angular';

import { UserPageComponent } from './user.page.component';

describe('UserComponent', () => {
  async function setup() {
    const { fixture } = await render(UserPageComponent, {});
    return {
      fixture,
    };
  }

  it('should compile', async () => {
    const { fixture } = await setup();
    expect(fixture).toBeTruthy();
  });
});
