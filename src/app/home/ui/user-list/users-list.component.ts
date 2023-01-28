import { NgForOf, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PocketBaseUser } from '../../../shared/interfaces/user';

@Component({
  selector: 'usrm-users-list',
  standalone: true,
  template: `
    <div class="overflow-x-auto cover">
      <table class="table table-compact w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Job Description</th>
            <th>Location</th>
            <th></th>
          </tr>
        </thead>
        <tbody *ngFor="let user of users; trackBy: usersTrackByFn">
          <tr>
            <td>{{ user.name + ' ' + user.surname | titlecase }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.position | titlecase }}</td>
            <td>{{ user.location | titlecase }}</td>
            <th class="flex justify-between gap-1">
              <a [routerLink]="['/users/', user.id]">
                <button class="btn btn-outline btn-secondary btn-xs">
                  details
                </button>
              </a>
              <a [routerLink]="['/users/' + user.id + '/edit']">
                <button class="btn btn-outline btn-accent btn-xs">edit</button>
              </a>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  imports: [TitleCasePipe, RouterLink, NgForOf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  @Input() users: PocketBaseUser[];

  usersTrackByFn(_: number, user: PocketBaseUser) {
    return user.id;
  }
}
