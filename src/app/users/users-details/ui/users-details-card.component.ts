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
        <button class="btn btn-active btn-accent m-4">&larr; Go back</button>
      </a>
      <div class="card center w-96 bg-accent-content/20 w-full shadow-xl">
        <figure class="px-10 pt-10">
          <img
            src="https://api.lorem.space/image/face?w=400&h=225"
            [alt]="user.name + ' ' + user.surname"
            class="rounded-xl"
          />
        </figure>
        <div class="card-body">
          <div class="items-center text-center">
            <h2 class="card-title block mt-1">
              {{ user.name + ' ' + user.surname }}
            </h2>
            <div class="badge badge-secondary mt-1">
              <span class="text-sm">{{ user.position }}</span>
            </div>
            <p class="mt-1">{{ user.location }}</p>
          </div>
          <div class="card-actions justify-end">
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
