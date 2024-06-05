import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { ACTIONS, useAuthForm } from '@/features/auth/hooks';
import { INPUTS } from '@/features/auth/utils';

import { FormLayout } from './FormLayout';

export const LoginForm = () => {
  const {
    register,
    formSubmitHandler,
    formValidations,
    formErrors,
    isFormEmpty,
    isServerError,
    isServerPending,
  } = useAuthForm(ACTIONS.LOGIN);

  return (
    <FormLayout onSubmit={formSubmitHandler}>
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
      <Button
        variant="contained"
        type="submit"
        disabled={isFormEmpty || isServerPending || isServerError}
      >
        Login
      </Button>
    </FormLayout>
  );
};
