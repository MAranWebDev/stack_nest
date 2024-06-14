import { MaxLength, MinLength } from 'class-validator';

import { IsCustomId } from '@/features/user-roles/decorators';

export class CreateUserRoleDto {
  @IsCustomId()
  _id: string;

  @MinLength(4)
  @MaxLength(20)
  name: string;
}
