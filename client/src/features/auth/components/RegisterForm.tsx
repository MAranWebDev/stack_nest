import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';

import { INPUTS, RegisterInputsType, authService, getRegisterValidations } from '@/features/auth';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterInputsType>();

  const registerValidations = getRegisterValidations({ getValues });

  const onSubmit: SubmitHandler<RegisterInputsType> = async ({ name, email, password }) => {
    await authService.register({ name, email, password });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto',
        p: 6,
        width: 500,
        border: 1,
        borderRadius: 1,
        borderColor: 'text.disabled',
      }}
      component="form"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        sx={{ mb: 2 }}
        label="Name"
        required
        error={errors.name ? true : false}
        helperText={errors.name?.message}
        {...register(INPUTS.NAME, registerValidations.name)}
      />
      <TextField
        sx={{ mb: 2 }}
        label="Email"
        type="email"
        required
        error={errors.email ? true : false}
        helperText={errors.email?.message}
        {...register(INPUTS.EMAIL, registerValidations.email)}
      />
      <TextField
        sx={{ mb: 2 }}
        label="Password"
        type="password"
        required
        error={errors.password ? true : false}
        helperText={errors.password?.message}
        {...register(INPUTS.PASSWORD, registerValidations.password)}
      />
      <TextField
        sx={{ mb: 2 }}
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
    </Box>
  );
};
