import { Routes } from '@angular/router';
import { UsersShellComponent } from './users.shell.component';
import { UsersStore } from './data-access/users.store';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UsersShellComponent,
    providers: [UsersStore],
    children: [
      {
        path: '',
        redirectTo: ':id',
        pathMatch: 'full',
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./users-details/users-details.page.component').then(
            (m) => m.UsersDetailsPageComponent
          ),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./users-edit/users-edit.page.component').then(
            (m) => m.UsersEditPageComponent
          ),
      },
    ],
  },
];
