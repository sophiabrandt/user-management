import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PocketBaseUser, User } from '../../../shared/interfaces/user';

@Component({
  selector: 'usrm-users-edit-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="m-2">
      <form
        #form="ngForm"
        (submit)="onSubmit(form)"
        class="users-edit-form center form form-control w-full max-w-xs"
      >
        <div class="form-group">
          <label class="label">
            <span class="label-text">Name</span>
          </label>
          <input
            required
            minlength="2"
            pattern="^[a-zA-z- ]+$"
            name="name"
            [(ngModel)]="usersEditFormModel.name"
            type="text"
            placeholder="My name"
            class="input input-bordered"
          />
        </div>
        <div class="form-group">
          <label class="label">
            <span class="label-text">Surname</span>
          </label>
          <input
            required
            minlength="2"
            pattern="^[a-zA-z- ]+$"
            name="surname"
            [(ngModel)]="usersEditFormModel.surname"
            type="text"
            placeholder="My last name"
            class="input input-bordered"
          />
        </div>
        <div class="form-group form-group--full-width">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            required
            email
            name="email"
            [(ngModel)]="usersEditFormModel.email"
            type="email"
            placeholder="email@example.com"
            class="input input-bordered"
          />
        </div>
        <div class="form-group">
          <label class="label">
            <span class="label-text">Position</span>
          </label>
          <input
            required
            minlength="2"
            pattern="^[a-zA-z- ]+$"
            name="position"
            [(ngModel)]="usersEditFormModel.position"
            type="text"
            placeholder="CEO"
            class="input input-bordered"
          />
        </div>
        <div class="form-group">
          <label class="label">
            <span class="label-text">Location</span>
          </label>
          <input
            required
            minlength="2"
            pattern="^[a-zA-z- ]+$"
            name="location"
            [(ngModel)]="usersEditFormModel.location"
            type="text"
            placeholder="remote"
            class="input input-bordered"
          />
        </div>
        <button
          [disabled]="form.invalid"
          type="submit"
          class="form-group form-group--full-width w-full btn btn-wide disabled:btn-disabled"
        >
          Submit
        </button>
      </form>
    </div>
  `,
  styles: [
    `
      .users-edit-form {
        display: grid;
        gap: 1.25rem;
      }

      @media (min-width: 35em) {
        .users-edit-form {
          grid-template-columns: 1fr 1fr;
        }
      }

      .form-group {
        display: grid;
        gap: 0.5rem;
      }

      .form-group--full-width {
        grid-column: 1/-1;
      }
      .ng-valid.ng-dirty:not([ngModelGroup]):not(form) {
        border: 2px solid yellowgreen;
      }
      .ng-invalid.ng-dirty:not([ngModelGroup]):not(form) {
        border: 2px solid tomato;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersEditFormComponent implements OnInit {
  @Input() user: PocketBaseUser;

  @Output() editUser = new EventEmitter<PocketBaseUser>();

  usersEditFormModel: User;

  ngOnInit(): void {
    this.usersEditFormModel = this.user;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log(form.value);
      this.editUser.emit(this.user);
    } else {
      form.form.markAllAsTouched();
    }
  }
}
