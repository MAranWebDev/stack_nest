import { IsString, IsUppercase, MaxLength, MinLength } from 'class-validator';

import { LogUserDto } from './log-user.dto';

export class CreateUserDto extends LogUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  name: string;

  @IsUppercase()
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  role: string;
}
