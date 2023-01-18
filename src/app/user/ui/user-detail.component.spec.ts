import { render } from '@testing-library/angular';

import { UserDetailComponent } from './user-detail.component';

describe('UserDetailComponent', () => {
  async function setup() {
    const { fixture } = await render(UserDetailComponent, {
      providers: [],
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
