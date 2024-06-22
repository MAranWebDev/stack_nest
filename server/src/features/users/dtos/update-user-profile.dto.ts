import { OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

import { PERMISSIONS } from '@/features/auth/constants';
import { IsCustomId } from '@/features/users/decorators';

import { CreateUserProfileDto } from './create-user-profile.dto';

export class UpdateUserProfileDto extends PartialType(
  OmitType(CreateUserProfileDto, ['_id'] as const),
) {
  @IsCustomId({ array: true })
  @IsArray()
  @IsOptional()
  permissions?: PERMISSIONS[];
}
