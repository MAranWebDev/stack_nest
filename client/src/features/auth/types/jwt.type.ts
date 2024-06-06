export interface DecodedJwtType {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface JwtType extends DecodedJwtType {
  token: string;
}
