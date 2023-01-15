import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

describe('AppComponent', () => {
  async function setup() {
    const { fixture } = await render(AppComponent, {
      imports: [HomeComponent, HeaderComponent],
    });
    return {
      fixture,
    };
  }

  it('should render the header and a home table', async () => {
    await setup();

    expect(screen.getByRole('heading')).toHaveTextContent('User Management');
    screen.getByRole('columnheader', { name: /name/i });
    screen.getByRole('columnheader', { name: /email/i });
    screen.getByRole('columnheader', { name: /job description/i });
    screen.getByRole('columnheader', { name: /location/i });
  });
});
