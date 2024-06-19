import { MaxLength, MinLength } from 'class-validator';

import { PERMISSIONS } from '@/features/auth/constants';
import { IsCustomId } from '@/features/users/decorators';

export class CreateUserPermissionDto {
  @IsCustomId()
  _id: PERMISSIONS;

  @MinLength(4)
  @MaxLength(30)
  description: string;
}
