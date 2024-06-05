import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthContext } from '@/features/auth/Auth.context';
import { authService } from '@/features/auth/auth.service';
import {
  getLoginValidations,
  getRegisterValidations,
  INPUTS,
  RegisterInputsType,
} from '@/features/auth/utils';
import { NavbarContext } from '@/features/navbar/Navbar.context';

type ActionType = (typeof ACTIONS)[keyof typeof ACTIONS];

export const ACTIONS = {
  LOGIN: 'login',
  REGISTER: 'register',
} as const;

const loginValues = { [INPUTS.EMAIL]: '', [INPUTS.PASSWORD]: '' };
const loginArray = [INPUTS.EMAIL, INPUTS.PASSWORD];
const registerValues = { ...loginValues, [INPUTS.NAME]: '', [INPUTS.CONFIRM_PASSWORD]: '' };
const registerArray = [...loginArray, INPUTS.NAME, INPUTS.CONFIRM_PASSWORD];

export const useAuthForm = (action: ActionType) => {
  const condition = action === ACTIONS.LOGIN ? true : false;

  const { handleLoader: handleLoadingState, isError, isPending } = useContext(NavbarContext);
  const { handleValues: handleAuthState } = useContext(AuthContext);

  const { mutate } = useMutation({
    mutationFn: condition ? authService.login : authService.register,
    onMutate: () => {
      handleLoadingState({ isPending: true });
    },
    onSettled: () => {
      handleLoadingState({ isPending: false });
    },
    onSuccess: ({ token, name, role }) => {
      handleAuthState({ jwt: token, user: name, userRole: role });
    },
    onError: ({ message }) => {
      handleLoadingState({ isError: true, errorMessage: message });
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<RegisterInputsType>({
    defaultValues: condition ? loginValues : registerValues,
  });

  const watchedFields = watch(condition ? loginArray : registerArray);
  const isFormEmpty = Object.values(watchedFields).some((value) => value === '');
  const formValidations = condition ? getLoginValidations() : getRegisterValidations({ getValues });

  const onSubmit: SubmitHandler<RegisterInputsType> = async (inputs) => mutate(inputs);

  return {
    register,
    formSubmitHandler: handleSubmit(onSubmit),
    formValidations,
    formErrors: errors,
    isFormEmpty,
    isServerError: isError,
    isServerPending: isPending,
  };
};
