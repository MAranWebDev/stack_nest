import { INPUTS } from '@/features/auth/constants';

export interface RegisterInputsType {
  [INPUTS.NAME]: string;
  [INPUTS.EMAIL]: string;
  [INPUTS.PASSWORD]: string;
  [INPUTS.CONFIRM_PASSWORD]: string;
}

export interface LoginInputsType
  extends Pick<RegisterInputsType, typeof INPUTS.EMAIL | typeof INPUTS.PASSWORD> {}

export interface RegisterBodyType
  extends Omit<RegisterInputsType, typeof INPUTS.CONFIRM_PASSWORD> {}
