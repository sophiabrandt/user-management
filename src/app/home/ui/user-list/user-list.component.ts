import { NgFor, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PocketBaseUser } from '../../../shared/interfaces/user';

@Component({
  selector: 'usrm-user-list',
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
        <tbody *ngFor="let user of users">
          <tr>
            <td>{{ user.name + ' ' + user.surname | titlecase }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.position | titlecase }}</td>
            <td>{{ user.location | titlecase }}</td>
            <th>
              <a [routerLink]="['/users/', user.id]">
                <button class="btn btn-outline btn-secondary btn-xs">
                  details
                </button>
              </a>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  imports: [NgFor, TitleCasePipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @Input() users!: PocketBaseUser[];
}
