import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

import { IsCustomId } from '@/features/users/decorators';

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
  @MaxLength(12)
  password: string;

  @IsCustomId()
  profileId: string;
}
