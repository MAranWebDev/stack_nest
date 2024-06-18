import { MaxLength, MinLength } from 'class-validator';

import { PROFILES } from '@/features/users/constants';
import { IsCustomId } from '@/features/users/decorators';

export class CreateUserProfileDto {
  @IsCustomId()
  _id: PROFILES;

  @MinLength(4)
  @MaxLength(20)
  description: string;
}
