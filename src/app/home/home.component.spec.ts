import { render } from '@testing-library/angular';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  async function setup() {
    const { fixture } = await render(HomeComponent, {});
    return {
      fixture,
    };
  }
});
