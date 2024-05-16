import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';

import { authApi } from '@/features/auth';

interface InputsType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// const REGEX = {
//   USER: /^[A-z][A-z0-9-_]{3,23}$/,
//   PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
// };

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<InputsType>();

  const onSubmit: SubmitHandler<InputsType> = async ({ name, email, password }) => {
    await authApi.register({ name, email, password });
  };

  const inputValidations = {
    name: {
      required: 'Value missing',
      minLength: {
        value: 2,
        message: 'minimum 2 characters',
      },
      maxLength: 20,
    },
    email: {
      required: 'Value missing',
    },
    password: {
      required: 'Value missing',
      // pattern: REGEX.PASSWORD,
    },
    confirmPassword: {
      required: 'Value missing',
      // pattern: REGEX.PASSWORD,
      validate: {
        compare: (value: string) =>
          getValues('password') === value || 'Must match password input field',
      },
    },
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
        {...register('name', inputValidations.name)}
      />
      <TextField
        sx={{ mb: 2 }}
        label="Email"
        required
        error={errors.email ? true : false}
        helperText={errors.email?.message}
        {...register('email', inputValidations.email)}
      />
      <TextField
        sx={{ mb: 2 }}
        label="Password"
        type="password"
        required
        error={errors.password ? true : false}
        helperText={errors.password?.message}
        {...register('password', inputValidations.password)}
      />
      <TextField
        sx={{ mb: 2 }}
        label="Confirm Password"
        type="password"
        required
        error={errors.confirmPassword ? true : false}
        helperText={errors.confirmPassword?.message}
        {...register('confirmPassword', inputValidations.confirmPassword)}
      />
      <Button variant="contained" type="submit">
        Register
      </Button>
    </Box>
  );
};
