import {
  INPUTS,
  LoginReturnType,
  RegisterPropsType,
  RegisterReturnType,
} from '@/features/auth/types';

const REGEX = { EMAIL: /\S+@\S+\.\S+/ };
const EMAIL_VALUES = { MAX_LENGTH: 50 };
const NAME_VALUES = { MIN_LENGTH: 4, MAX_LENGTH: 12 };
const PASSWORD_VALUES = { MIN_LENGTH: 4, MAX_LENGTH: 12 };

/* functions */
export const getLoginValidations = (): LoginReturnType => {
  return {
    [INPUTS.EMAIL]: {
      required: 'Input required',
      pattern: {
        value: REGEX.EMAIL,
        message: 'Input does not match email format',
      },
      maxLength: {
        value: EMAIL_VALUES.MAX_LENGTH,
        message: `maximum length is ${EMAIL_VALUES.MAX_LENGTH}`,
      },
    },
    [INPUTS.PASSWORD]: {
      required: 'Input required',
      minLength: {
        value: PASSWORD_VALUES.MIN_LENGTH,
        message: `minimum length is ${PASSWORD_VALUES.MIN_LENGTH}`,
      },
      maxLength: {
        value: PASSWORD_VALUES.MAX_LENGTH,
        message: `maximum length is ${PASSWORD_VALUES.MAX_LENGTH}`,
      },
    },
  };
};

export const getRegisterValidations = ({ getValues }: RegisterPropsType): RegisterReturnType => {
  const loginValidations = getLoginValidations();

  return {
    ...loginValidations,
    [INPUTS.NAME]: {
      required: 'Input required',
      minLength: {
        value: NAME_VALUES.MIN_LENGTH,
        message: `minimum length is ${NAME_VALUES.MIN_LENGTH}`,
      },
      maxLength: {
        value: NAME_VALUES.MAX_LENGTH,
        message: `maximum length is ${NAME_VALUES.MAX_LENGTH}`,
      },
    },
    [INPUTS.CONFIRM_PASSWORD]: {
      ...loginValidations.password,
      validate: {
        comparePasswords: (value: string) =>
          getValues(INPUTS.PASSWORD) === value || 'Must match password',
      },
    },
  };
};
