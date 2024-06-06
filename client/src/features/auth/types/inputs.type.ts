import { INPUTS } from '@/features/auth/constants';

export interface LoginInputsType {
  [INPUTS.EMAIL]: string;
  [INPUTS.PASSWORD]: string;
}

export interface RegisterInputsType extends LoginInputsType {
  [INPUTS.NAME]: string;
  [INPUTS.CONFIRM_PASSWORD]: string;
}

export interface RegisterBodyType
  extends Omit<RegisterInputsType, typeof INPUTS.CONFIRM_PASSWORD> {}
