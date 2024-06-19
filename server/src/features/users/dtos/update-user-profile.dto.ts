import { OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { IsCustomId } from '@/features/users/decorators';

import { CreateUserProfileDto } from './create-user-profile.dto';

export class UpdateUserProfileDto extends PartialType(
  OmitType(CreateUserProfileDto, ['_id'] as const),
) {
  @IsCustomId()
  @IsOptional()
  permissions?: string[];
}
