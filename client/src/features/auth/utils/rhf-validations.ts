import {
  INPUTS,
  LoginReturnType,
  RegisterPropsType,
  RegisterReturnType,
} from '@/features/auth/types';

// const REGEX = {
//   USER: /^[A-z][A-z0-9-_]{3,23}$/,
//   PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
// };

/* functions */
export const getLoginValidations = (): LoginReturnType => {
  return {
    [INPUTS.EMAIL]: {
      required: 'Value missing',
    },
    [INPUTS.PASSWORD]: {
      required: 'Value missing',
      // pattern: REGEX.PASSWORD,
    },
  };
};

export const getRegisterValidations = ({ getValues }: RegisterPropsType): RegisterReturnType => {
  const loginValidations = getLoginValidations();

  return {
    ...loginValidations,
    [INPUTS.NAME]: {
      required: 'Value missing',
      minLength: {
        value: 2,
        message: 'minimum 2 characters',
      },
      maxLength: 20,
    },
    [INPUTS.CONFIRM_PASSWORD]: {
      required: 'Value missing',
      // pattern: REGEX.PASSWORD,
      validate: {
        compare: (value: string) =>
          getValues(INPUTS.PASSWORD) === value || 'Must match password input field',
      },
    },
  };
};
