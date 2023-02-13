import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { HttpRequestState } from '../../../shared/interfaces/http-request-state';
import { USER_EXAMPLE } from '../../../shared/interfaces/user';

import { UsersEditFormComponent } from './users-edit-form.component';

describe('UsersEditFormComponent', () => {
  async function setup(overwriteProps = {}) {
    const submitSpy = jest.fn();
    const { fixture } = await render(UsersEditFormComponent, {
      componentProperties: {
        user: USER_EXAMPLE,
        userEditState: HttpRequestState.PENDING,
        onSubmit: submitSpy,
        ...overwriteProps,
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

    expect(
      screen.getByRole('textbox', { name: /name required/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('alert', { name: /required/i })
    ).toBeInTheDocument();

    await userEvent.type(
      screen.getByRole('textbox', { name: /name required/i }),
      'Jane'
    );

    await userEvent.click(submitButton);
    expect(submitSpy).toHaveBeenCalledTimes(1);
  });

  it('should show validation errors', async () => {
    await setup();

    const location = screen.getByRole('textbox', { name: /location/i });
    await userEvent.clear(location);
    await userEvent.type(location, '[[');

    const email = screen.getByRole('textbox', { name: /email/i });
    await userEvent.clear(email);
    await userEvent.type(email, 'a');

    expect(
      screen.getByRole('alert', { name: /min length/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('alert', { name: /only letters/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('alert', { name: /only valid email addresses/i })
    ).toBeInTheDocument();
  });

  it('should show the error when saving changes does not work', async () => {
    await setup({
      userEditState: HttpRequestState.ERROR,
    });

    expect(
      screen.getByRole('alert', { name: /error occurred/i })
    ).toBeInTheDocument();
  });
});
