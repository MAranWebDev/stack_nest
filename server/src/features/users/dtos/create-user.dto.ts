import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  name: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  password: string;
}
