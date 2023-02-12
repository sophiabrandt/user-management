import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HomePageComponent } from '../../../home/home.page.component';
import { UsersService } from '../../../shared/data-access/users.service';
import { HttpRequestState } from '../../../shared/interfaces/http-request-state';
import { USER_EXAMPLE } from '../../../shared/interfaces/user';

import { UsersEditStore } from './users-edit.store';

describe('UsersEditStore', () => {
  function setup(overwriteMock = {}) {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            loadComponent: () => HomePageComponent,
          },
        ]),
      ],
      providers: [
        UsersEditStore,
        {
          provide: UsersService,
          useValue: {
            updateUserById: jest
              .fn()
              .mockReturnValue(of(HttpRequestState.SUCCESS)),
            ...overwriteMock,
          },
        },
      ],
    });

    const store = TestBed.inject(UsersEditStore);
    const router = TestBed.inject(Router);
    return { store, router };
  }

  it('should edit a user', fakeAsync(() => {
    const { store } = setup();

    store.editUser(USER_EXAMPLE);

    store.httpRequestState$.subscribe({
      next: (result) => expect(result).toEqual(HttpRequestState.SUCCESS),
    });

    tick();
  }));

  it('should redirect to home page after succesful edit', fakeAsync(() => {
    const { router, store } = setup();
    const routerSpy = jest.spyOn(router, 'navigate');

    store.editUser(USER_EXAMPLE);

    store.httpRequestState$.subscribe({
      next: (result) => expect(result).toEqual(HttpRequestState.SUCCESS),
    });

    tick();

    expect(routerSpy).toHaveBeenCalledWith(['/home']);
  }));
});
