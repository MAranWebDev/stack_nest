import { IsOptional } from 'class-validator';

import { PERMISSIONS } from '@/features/users/constants';
import { IsCustomPermission } from '@/features/users/decorators';

export class CreateProfileDto {
  @IsCustomPermission()
  _id: string;

  @IsCustomPermission({ isArray: true })
  @IsOptional()
  permissions?: PERMISSIONS[];
}
