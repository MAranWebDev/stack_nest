import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { PROFILES } from '@/features/users/constants';
import { IsCustomId } from '@/features/users/decorators';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends IntersectionType(
  PartialType(OmitType(CreateUserDto, ['email', 'password'] as const)),
) {
  @IsCustomId()
  @IsOptional()
  profile?: PROFILES;
}
