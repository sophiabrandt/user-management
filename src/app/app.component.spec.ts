import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home/home.page.component';
import { HeaderComponent } from './shared/ui/header/header.component';

describe('AppComponent', () => {
  async function setup() {
    const { fixture } = await render(AppComponent, {
      imports: [HomePageComponent, HeaderComponent],
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
