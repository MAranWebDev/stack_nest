export interface JwtType {
  token: string;
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface DecodedJwtType extends Omit<JwtType, 'token'> {}
