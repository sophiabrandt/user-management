import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  HttpRequestState,
  HttpRequestStateType,
} from '../../../shared/interfaces/http-request-state';
import { PocketBaseUser, User } from '../../../shared/interfaces/user';

@Component({
  selector: 'usrm-users-edit-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <div class="m-2">
      <form
        #form="ngForm"
        (ngSubmit)="onSubmit(form)"
        class="w-full max-w-xs users-edit-form center form form-control"
      >
        <div class="form-group">
          <label for="name" class="label">
            <span class="label-text">Name</span>
            <ng-container *ngIf="name.dirty && name.hasError('required')">
              <span class="text-sm text-red-500">This field is required.</span>
            </ng-container>
            <ng-container *ngIf="name.dirty && name.hasError('minlength')">
              <span class="text-sm text-red-500"
                >Min
                {{ name.getError('minlength').requiredLength }}
                characters.</span
              >
            </ng-container>
            <ng-container *ngIf="name.dirty && name.hasError('pattern')">
              <span class="text-sm text-red-500"
                >Only letters are allowed.</span
              >
            </ng-container>
          </label>
          <input
            required
            minlength="2"
            pattern="^[a-zA-Z- ]+$"
            name="name"
            id="name"
            #name="ngModel"
            [(ngModel)]="usersEditFormModel.name"
            type="text"
            placeholder="My name"
            class="input input-bordered"
          />
        </div>
        <div class="form-group">
          <label for="surname" class="label">
            <span class="label-text">Last name</span>
            <ng-container *ngIf="surname.dirty && surname.hasError('required')">
              <span class="text-sm text-red-500">This field is required.</span>
            </ng-container>
            <ng-container
              *ngIf="surname.dirty && surname.hasError('minlength')"
            >
              <span class="text-sm text-red-500"
                >Min
                {{ surname.getError('minlength').requiredLength }}
                characters.</span
              >
            </ng-container>
            <ng-container *ngIf="surname.dirty && surname.hasError('pattern')">
              <span class="text-sm text-red-500"
                >Only letters are allowed.</span
              >
            </ng-container>
          </label>
          <input
            required
            minlength="2"
            pattern="^[a-zA-Z- ]+$"
            name="surname"
            id="surname"
            #surname="ngModel"
            [(ngModel)]="usersEditFormModel.surname"
            type="text"
            placeholder="My surname"
            class="input input-bordered"
          />
        </div>
        <div class="form-group form-group--full-width">
          <label for="email" class="label">
            <span class="label-text">Email</span>
            <ng-container *ngIf="email.dirty && email.hasError('required')">
              <span class="text-sm text-red-500">This field is required.</span>
            </ng-container>
            <ng-container *ngIf="email.dirty && email.hasError('email')">
              <span class="text-sm text-red-500"
                >Only valid email addresses.</span
              >
            </ng-container>
          </label>
          <input
            required
            email
            name="email"
            id="email"
            #email="ngModel"
            [(ngModel)]="usersEditFormModel.email"
            type="email"
            placeholder="email@example.com"
            class="input input-bordered"
          />
        </div>
        <div class="form-group">
          <label for="position" class="label">
            <span class="label-text">Position</span>
            <ng-container
              *ngIf="position.dirty && position.hasError('required')"
            >
              <span class="text-sm text-red-500">This field is required.</span>
            </ng-container>
            <ng-container
              *ngIf="position.dirty && position.hasError('minlength')"
            >
              <span class="text-sm text-red-500"
                >Min
                {{ position.getError('minlength').requiredLength }}
                characters.</span
              >
            </ng-container>
            <ng-container
              *ngIf="position.dirty && position.hasError('pattern')"
            >
              <span class="text-sm text-red-500"
                >Only letters are allowed.</span
              >
            </ng-container>
          </label>
          <input
            required
            minlength="2"
            pattern="^[a-zA-Z- ]+$"
            name="position"
            id="position"
            #position="ngModel"
            [(ngModel)]="usersEditFormModel.position"
            type="text"
            placeholder="CEO"
            class="input input-bordered"
          />
        </div>
        <div class="form-group">
          <label for="location" class="label">
            <span class="label-text">Location</span>
            <ng-container
              *ngIf="location.dirty && location.hasError('required')"
            >
              <span class="text-sm text-red-500">This field is required.</span>
            </ng-container>
            <ng-container
              *ngIf="location.dirty && location.hasError('minlength')"
            >
              <span class="text-sm text-red-500"
                >Min
                {{ location.getError('minlength').requiredLength }}
                characters.</span
              >
            </ng-container>
            <ng-container
              *ngIf="location.dirty && location.hasError('pattern')"
            >
              <span class="text-sm text-red-500"
                >Only letters are allowed.</span
              >
            </ng-container>
          </label>
          <input
            required
            minlength="2"
            pattern="^[a-zA-Z- ]+$"
            name="location"
            id="location"
            #location="ngModel"
            [(ngModel)]="usersEditFormModel.location"
            type="text"
            placeholder="remote"
            class="input input-bordered"
          />
        </div>
        <button
          [disabled]="
            form.invalid || userEditState === HttpRequestState.IN_PROGRESS
          "
          type="submit"
          class="w-full transition-all ease-in-out form-group form-group--full-width btn btn-wide disabled:btn-disabled"
          [class.animate-pulse]="userEditState === HttpRequestState.IN_PROGRESS"
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

  @Input() userEditState: HttpRequestStateType;

  @Output() editUser = new EventEmitter<Partial<PocketBaseUser>>();

  usersEditFormModel: User;

  readonly HttpRequestState = HttpRequestState;

  ngOnInit(): void {
    this.usersEditFormModel = this.user;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      form.resetForm(form.value);
      this.editUser.emit({ ...form.value, id: this.user.id });
    } else {
      form.form.markAllAsTouched();
    }
  }
}
