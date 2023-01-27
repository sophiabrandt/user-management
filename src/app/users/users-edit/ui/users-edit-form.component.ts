import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PocketBaseUser, User } from '../../../shared/interfaces/user';

@Component({
  selector: 'usrm-users-edit-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form
      #form="ngForm"
      (submit)="submit()"
      class="form-control w-full max-w-xs"
    >
      <label class="label">
        <span class="label-text">Name</span>
      </label>
      <input
        name="formName"
        [(ngModel)]="usersEditFormModel.name"
        type="text"
        placeholder="My name"
        class="input input-bordered w-full max-w-xs"
      />
      <label class="label"> </label>
      <button type="submit" class="btn btn-wide">Submit</button>
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersEditFormComponent implements OnInit {
  @Input() user: PocketBaseUser;

  @Output() editUser = new EventEmitter<PocketBaseUser>();

  @ViewChild(NgForm) form: NgForm;

  usersEditFormModel: User;

  ngOnInit(): void {
    this.usersEditFormModel = this.user;
  }

  submit(): void {
    if (this.form.valid) {
      this.editUser.emit(this.user);
    } else {
      this.form.form.markAllAsTouched();
    }
  }
}
