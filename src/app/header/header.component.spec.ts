import { render, screen } from '@testing-library/angular';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  async function setup() {
    const { fixture } = await render(HeaderComponent, {});
    return {
      fixture,
    };
  }

  it('should show a header with title "User Management"', async () => {
    await setup();
    expect(screen.getByRole('heading')).toHaveTextContent('User Management');
  });

  it('should show a profile picture with menu', async () => {
    await setup();
    screen.getByRole('img');
    screen.getByText(/settings/i);
    screen.getByText(/logout/i);
  });
});
