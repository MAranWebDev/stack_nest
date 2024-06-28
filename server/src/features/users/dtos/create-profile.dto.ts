import { IsOptional } from 'class-validator';

import { PERMISSIONS } from '@/features/users/constants';
import { IsCustomId } from '@/features/users/decorators';

export class CreateProfileDto {
  @IsCustomId()
  _id: string;

  @IsCustomId({ isArray: true })
  @IsOptional()
  permissions?: PERMISSIONS[];
}
