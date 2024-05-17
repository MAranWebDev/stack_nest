/* enums */
export enum INPUTS {
  NAME = 'name',
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirm_password',
}

/* types */
export interface LoginInputsType {
  [INPUTS.EMAIL]: string;
  [INPUTS.PASSWORD]: string;
}

export interface RegisterInputsType extends LoginInputsType {
  [INPUTS.NAME]: string;
  [INPUTS.CONFIRM_PASSWORD]: string;
}
