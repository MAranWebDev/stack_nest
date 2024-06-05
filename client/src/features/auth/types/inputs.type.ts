/* constants */
export const INPUTS = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirm_password',
} as const;

/* types */
export type InputsType = (typeof INPUTS)[keyof typeof INPUTS];

export interface LoginInputsType {
  [INPUTS.EMAIL]: string;
  [INPUTS.PASSWORD]: string;
}

export interface RegisterInputsType extends LoginInputsType {
  [INPUTS.NAME]: string;
  [INPUTS.CONFIRM_PASSWORD]: string;
}

export interface LoginBodyType extends LoginInputsType {}
export interface RegisterBodyType
  extends Omit<RegisterInputsType, typeof INPUTS.CONFIRM_PASSWORD> {}
