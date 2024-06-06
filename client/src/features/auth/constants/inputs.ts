export type InputsType = (typeof INPUTS)[keyof typeof INPUTS];

export const INPUTS = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirm_password',
} as const;
