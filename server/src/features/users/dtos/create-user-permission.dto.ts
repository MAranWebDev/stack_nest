import { MaxLength, MinLength } from 'class-validator';

import { IsCustomId } from '@/features/users/decorators';

export class CreateUserPermissionDto {
  @IsCustomId()
  _id: string;

  @MinLength(4)
  @MaxLength(30)
  description: string;
}
