import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PocketBaseUser } from '../../../shared/interfaces/user';

@Component({
  selector: 'usrm-users-details-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div>
      <a [routerLink]="['/home']">
        <button class="m-4 btn btn-active btn-accent">&larr; Go back</button>
      </a>
      <div class="w-96 w-full shadow-xl card center bg-accent-content/20">
        <figure class="px-10 pt-10">
          <img
            src="https://api.lorem.space/image/face?w=400&h=225"
            [alt]="user.name + ' ' + user.surname"
            class="rounded-xl"
          />
        </figure>
        <div class="card-body">
          <div class="items-center text-center">
            <h2 class="mt-1 block card-title">
              {{ user.name + ' ' + user.surname }}
            </h2>
            <div class="mt-1 badge badge-secondary">
              <span class="text-sm">{{ user.position }}</span>
            </div>
            <p class="mt-1">{{ user.location }}</p>
          </div>
          <div class="justify-end card-actions">
            <a [routerLink]="['/users', user.id, 'edit']"
              ><button class="btn btn-primary">Edit</button></a
            >
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDetailsCardComponent {
  @Input() user: PocketBaseUser;
}
