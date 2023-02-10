import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { HttpRequestState } from '../../../shared/interfaces/http-request-state';
import { USER_EXAMPLE } from '../../../shared/interfaces/user';

import { UsersEditFormComponent } from './users-edit-form.component';

describe('UsersEditFormComponent', () => {
  async function setup() {
    const submitSpy = jest.fn();
    const { fixture } = await render(UsersEditFormComponent, {
      componentProperties: {
        user: USER_EXAMPLE,
        userEditState: HttpRequestState.PENDING,
        onSubmit: submitSpy,
      },
    });
    return {
      fixture,
      submitSpy,
    };
  }

  it('should render a form', async () => {
    await setup();
    screen.getByRole('textbox', { name: 'Name' });
    screen.getByRole('textbox', { name: 'Last name' });
    screen.getByRole('textbox', { name: /email/i });
    screen.getByRole('textbox', { name: /location/i });
    screen.getByRole('textbox', { name: /position/i });
    screen.getByRole('button', {
      name: /submit/i,
    });
  });

  it('should prefill the values and be able to submit', async () => {
    const { submitSpy } = await setup();
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('John');
    expect(screen.getByRole('textbox', { name: 'Last name' })).toHaveValue(
      'Doe'
    );
    expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(
      'test@test.com'
    );
    expect(screen.getByRole('textbox', { name: /location/i })).toHaveValue(
      'remote'
    );
    expect(screen.getByRole('textbox', { name: /position/i })).toHaveValue(
      'Testing Manager'
    );

    const submitButton = screen.getByRole('button', {
      name: /submit/i,
    });

    await userEvent.click(submitButton);
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });

  it("should only be able to submit the form if it's valid", async () => {
    const { submitSpy } = await setup();
    await userEvent.clear(screen.getByRole('textbox', { name: 'Name' }));

    const submitButton = screen.getByRole('button', {
      name: /submit/i,
    });

    await userEvent.click(submitButton);
    expect(submitSpy).not.toHaveBeenCalled();

    await userEvent.type(
      screen.getByRole('textbox', { name: /field is required/i }),
      'Jane'
    );
    await userEvent.click(submitButton);
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });
});
