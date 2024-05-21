import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';

import { authService } from '@/features/auth/auth.service';
import { INPUTS, RegisterInputsType } from '@/features/auth/types';
import { getRegisterValidations } from '@/features/auth/utils';

import { FormLayout } from './FormLayout';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterInputsType>();

  const registerValidations = getRegisterValidations({ getValues });

  const onSubmit: SubmitHandler<RegisterInputsType> = async ({ name, email, password }) => {
    const response = await authService.register({ name, email, password });
    console.log(response);
  };

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        required
        error={errors.name ? true : false}
        helperText={errors.name?.message}
        {...register(INPUTS.NAME, registerValidations.name)}
      />
      <TextField
        label="Email"
        type="email"
        required
        error={errors.email ? true : false}
        helperText={errors.email?.message}
        {...register(INPUTS.EMAIL, registerValidations.email)}
      />
      <TextField
        label="Password"
        type="password"
        required
        error={errors.password ? true : false}
        helperText={errors.password?.message}
        {...register(INPUTS.PASSWORD, registerValidations.password)}
      />
      <TextField
        label="Confirm Password"
        type="password"
        required
        error={errors.confirm_password ? true : false}
        helperText={errors.confirm_password?.message}
        {...register(INPUTS.CONFIRM_PASSWORD, registerValidations.confirm_password)}
      />
      <Button variant="contained" type="submit">
        Register
      </Button>
    </FormLayout>
  );
};
