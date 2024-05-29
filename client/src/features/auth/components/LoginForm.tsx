import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthContext } from '@/features/auth/Auth.context';
import { authService } from '@/features/auth/auth.service';
import { INPUTS, LoginInputsType } from '@/features/auth/types';
import { getLoginValidations } from '@/features/auth/utils';
import { LoadingContext } from '@/features/loading/Loading.context';

import { FormLayout } from './FormLayout';

export const LoginForm = () => {
  const { changeValues: changeLoadingState, isError, isPending } = useContext(LoadingContext);
  const { changeValues: changeAuthState } = useContext(AuthContext);
  const { mutate } = useMutation({
    mutationFn: authService.login,
    onMutate: () => changeLoadingState({ isPending: true }),
    onSettled: () => changeLoadingState({ isPending: false }),
    onSuccess: ({ token, name, role }) =>
      changeAuthState({ jwt: token, user: name, userRole: role }),
    onError: ({ message }) => changeLoadingState({ isError: true, errorMessage: message }),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInputsType>({
    defaultValues: { [INPUTS.EMAIL]: '', [INPUTS.PASSWORD]: '' },
  });

  const loginValidations = getLoginValidations();
  const watchedFields = watch([INPUTS.EMAIL, INPUTS.PASSWORD]);
  const isFormEmpty = Object.values(watchedFields).some((value) => value === '');

  const onSubmit: SubmitHandler<LoginInputsType> = async ({ email, password }) =>
    mutate({ email, password });

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Email"
        type="email"
        disabled={isError}
        required
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register(INPUTS.EMAIL, loginValidations.email)}
      />
      <TextField
        label="Password"
        type="password"
        disabled={isError}
        required
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register(INPUTS.PASSWORD, loginValidations.password)}
      />
      <Button variant="contained" type="submit" disabled={isFormEmpty || isError || isPending}>
        Login
      </Button>
    </FormLayout>
  );
};
