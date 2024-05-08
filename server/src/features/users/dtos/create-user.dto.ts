import { IsNotEmpty, IsString } from 'class-validator';

import { LogUserDto } from './log-user.dto';

export class CreateUserDto extends LogUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
