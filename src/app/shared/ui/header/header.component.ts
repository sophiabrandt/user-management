import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'usrm-header',
  standalone: true,
  imports: [],
  template: `
    <header>
      <nav class="bg-sky-200 navbar">
        <div class="flex-1">
          <h1 class="text-lg dark:text-slate-500">User Management</h1>
        </div>
        <div class="flex-none gap-2">
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img
                  alt="profile"
                  src="https://api.lorem.space/image/face?w=80&h=80"
                />
              </div>
            </label>
            <ul
              tabindex="0"
              class="mt-3 w-52 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box"
            >
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
