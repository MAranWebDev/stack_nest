import { RegisterOptions, UseFormGetValues } from 'react-hook-form';

import { INPUTS, LoginInputsType, RegisterInputsType } from './inputs.type';

export interface RegisterPropsType {
  getValues: UseFormGetValues<RegisterInputsType>;
}

export interface LoginReturnType {
  [INPUTS.EMAIL]: RegisterOptions<LoginInputsType | RegisterInputsType, INPUTS.EMAIL>;
  [INPUTS.PASSWORD]: RegisterOptions<LoginInputsType | RegisterInputsType, INPUTS.PASSWORD>;
}

export interface RegisterReturnType extends LoginReturnType {
  [INPUTS.NAME]: RegisterOptions<RegisterInputsType, INPUTS.NAME>;
  [INPUTS.CONFIRM_PASSWORD]: RegisterOptions<RegisterInputsType, INPUTS.CONFIRM_PASSWORD>;
}
