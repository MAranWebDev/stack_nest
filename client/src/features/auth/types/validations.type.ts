import { RegisterOptions, UseFormGetValues } from 'react-hook-form';

import {
  ConfirmPasswordInputType,
  EmailInputType,
  INPUTS,
  NameInputType,
  PasswordInputType,
  RegisterInputsType,
} from './inputs.type';

export interface RegisterPropsType {
  getValues: UseFormGetValues<RegisterInputsType>;
}

export interface LoginReturnType {
  [INPUTS.EMAIL]: RegisterOptions<EmailInputType, INPUTS.EMAIL>;
  [INPUTS.PASSWORD]: RegisterOptions<PasswordInputType, INPUTS.PASSWORD>;
}

export interface RegisterReturnType extends LoginReturnType {
  [INPUTS.NAME]: RegisterOptions<NameInputType, INPUTS.NAME>;
  [INPUTS.CONFIRM_PASSWORD]: RegisterOptions<ConfirmPasswordInputType, INPUTS.CONFIRM_PASSWORD>;
}
