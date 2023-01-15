import { render } from '@testing-library/angular';
import { of } from 'rxjs';
import { USER_EXAMPLE } from '../shared/interfaces/user';
import { HomeStore } from './data-access/home.store';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  async function setup() {
    const { fixture } = await render(HomeComponent, {
      providers: [
        {
          provide: HomeStore,
          useValue: {
            loadUsers: jest.fn(),
            users$: of([USER_EXAMPLE]),
          },
        },
      ],
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
