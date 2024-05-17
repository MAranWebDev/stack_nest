/* enums */
export enum INPUTS {
  NAME = 'name',
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirm_password',
}

/* for validations */
export type NameInputType = { [INPUTS.NAME]: string };
export type EmailInputType = { [INPUTS.EMAIL]: string };
export type PasswordInputType = { [INPUTS.PASSWORD]: string };
export type ConfirmPasswordInputType = { [INPUTS.CONFIRM_PASSWORD]: string };

/* for forms */
export interface LoginInputsType extends EmailInputType, PasswordInputType {}

export interface RegisterInputsType
  extends LoginInputsType,
    NameInputType,
    ConfirmPasswordInputType {}
