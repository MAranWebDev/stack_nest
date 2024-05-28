import { IsNotEmpty, IsString, IsUppercase, MaxLength, MinLength } from 'class-validator';

export class CreateUserRoleDto {
  @IsUppercase()
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
