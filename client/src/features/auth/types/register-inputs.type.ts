import { LoginInputsType } from './login-inputs.type';

export interface RegisterInputsType extends LoginInputsType {
  name: string;
  confirmPassword: string;
}
