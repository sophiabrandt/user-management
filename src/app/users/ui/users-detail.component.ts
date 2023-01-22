import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'usrm-users-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div>
      <a [routerLink]="['/home']">
        <button class="btn btn-active btn-accent m-2">&larr; Go back</button>
      </a>
      <div class="cover center">
        <div class="card w-96 bg-accent-content/20 w-full shadow-xl">
          <figure class="px-10 pt-10">
            <img
              src="https://placeimg.com/400/225/arch"
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
              <button class="btn btn-primary">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDetailComponent {
  @Input() user: User;
}
