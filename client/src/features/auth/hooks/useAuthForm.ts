import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthContext } from '@/features/auth/Auth.context';
import { authService } from '@/features/auth/auth.service';
import { INPUTS, RegisterInputsType } from '@/features/auth/types';
import { getLoginValidations, getRegisterValidations } from '@/features/auth/utils';
import { LoadingContext } from '@/features/loading/Loading.context';

type ActionType = `${ACTIONS}`;

enum ACTIONS {
  REGISTER = 'register',
  LOGIN = 'login',
}

export const useAuthForm = (action: ActionType) => {
  const condition = action === ACTIONS.LOGIN ? true : false;

  const { changeValues: changeLoadingState, isError, isPending } = useContext(LoadingContext);
  const { changeValues: changeAuthState } = useContext(AuthContext);

  const { mutate } = useMutation({
    mutationFn: condition ? authService.login : authService.register,
    onMutate: () => {
      changeLoadingState({ isPending: true });
    },
    onSettled: () => {
      changeLoadingState({ isPending: false });
    },
    onSuccess: ({ token, name, role }) => {
      changeAuthState({ jwt: token, user: name, userRole: role });
    },
    onError: ({ message }) => {
      changeLoadingState({ isError: true, errorMessage: message });
    },
  });

  const loginValues = { [INPUTS.EMAIL]: '', [INPUTS.PASSWORD]: '' };
  const registerValues = { ...loginValues, [INPUTS.NAME]: '', [INPUTS.CONFIRM_PASSWORD]: '' };
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<RegisterInputsType>({
    defaultValues: condition ? loginValues : registerValues,
  });

  const formValidations = condition ? getLoginValidations() : getRegisterValidations({ getValues });

  const loginArray = [INPUTS.EMAIL, INPUTS.PASSWORD];
  const registerArray = [...loginArray, INPUTS.NAME, INPUTS.CONFIRM_PASSWORD];
  const watchedFields = watch(condition ? loginArray : registerArray);
  const isFormEmpty = Object.values(watchedFields).some((value) => value === '');

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
