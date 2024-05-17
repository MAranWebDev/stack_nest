import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';

import { INPUTS, LoginInputsType } from '@/features/auth/types';
import { getLoginValidations } from '@/features/auth/utils';

import { FormLayout } from './FormLayout';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputsType>();

  const loginValidations = getLoginValidations();

  const onSubmit: SubmitHandler<LoginInputsType> = async () => {};

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)}>
      <TextField
        sx={{ mb: 2 }}
        label="Email"
        type="email"
        required
        error={errors.email ? true : false}
        helperText={errors.email?.message}
        {...register(INPUTS.EMAIL, loginValidations.email)}
      />
      <TextField
        sx={{ mb: 2 }}
        label="Password"
        type="password"
        required
        error={errors.password ? true : false}
        helperText={errors.password?.message}
        {...register(INPUTS.PASSWORD, loginValidations.password)}
      />
      <Button variant="contained" type="submit">
        Login
      </Button>
    </FormLayout>
  );
};
