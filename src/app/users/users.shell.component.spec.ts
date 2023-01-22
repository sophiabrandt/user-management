import { render } from '@testing-library/angular';
import { HeaderComponent } from '../shared/ui/header/header.component';
import { UsersShellComponent } from './users.shell.component';

describe('UsersShellComponent', () => {
  async function setup() {
    const { fixture } = await render(UsersShellComponent, {
      imports: [UsersShellComponent, HeaderComponent],
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
