import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { ACTIONS, useAuthForm } from '@/features/auth/hooks';
import { INPUTS } from '@/features/auth/utils';

import { FormLayout } from './FormLayout';

export const RegisterForm = () => {
  const {
    register,
    formSubmitHandler,
    formValidations,
    formErrors,
    isFormEmpty,
    isServerError,
    isServerPending,
  } = useAuthForm(ACTIONS.REGISTER);

  return (
    <FormLayout onSubmit={formSubmitHandler}>
      <TextField
        label="Name"
        disabled={isServerError}
        required
        error={!!formErrors.name}
        helperText={formErrors.name?.message}
        {...register(INPUTS.NAME, formValidations.name)}
      />
      <TextField
        label="Email"
        type="email"
        disabled={isServerError}
        required
        error={!!formErrors.email}
        helperText={formErrors.email?.message}
        {...register(INPUTS.EMAIL, formValidations.email)}
      />
      <TextField
        label="Password"
        type="password"
        disabled={isServerError}
        required
        error={!!formErrors.password}
        helperText={formErrors.password?.message}
        {...register(INPUTS.PASSWORD, formValidations.password)}
      />
      <TextField
        label="Confirm Password"
        type="password"
        disabled={isServerError}
        required
        error={!!formErrors.confirm_password}
        helperText={formErrors.confirm_password?.message}
        {...register(INPUTS.CONFIRM_PASSWORD, formValidations.confirm_password)}
      />
      <Button
        variant="contained"
        type="submit"
        disabled={isFormEmpty || isServerPending || isServerError}
      >
        Register
      </Button>
    </FormLayout>
  );
};
