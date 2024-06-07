import { SubmitHandler, useForm } from 'react-hook-form';

import { ACTIONS, INPUTS } from '@/features/auth/constants';
import { RegisterInputsType } from '@/features/auth/types';
import { getLoginValidations, getRegisterValidations } from '@/features/auth/utils';

import { useAuthMutate } from './useAuthMutate';

const loginValues = { [INPUTS.EMAIL]: '', [INPUTS.PASSWORD]: '' };
const loginArray = [INPUTS.EMAIL, INPUTS.PASSWORD];
const registerValues = { ...loginValues, [INPUTS.NAME]: '', [INPUTS.CONFIRM_PASSWORD]: '' };
const registerArray = [...loginArray, INPUTS.NAME, INPUTS.CONFIRM_PASSWORD];

export const useAuthForm = (action: ACTIONS) => {
  const condition = action === ACTIONS.LOGIN ? true : false;

  const { mutate, isError, isPending } = useAuthMutate(action);
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
