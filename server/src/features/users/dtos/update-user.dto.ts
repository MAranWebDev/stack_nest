import { IntersectionType, OmitType, PartialType, PickType } from '@nestjs/swagger';

import { CreateUserRoleDto } from './create-user-role.dto';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends IntersectionType(
  OmitType(PartialType(CreateUserDto), ['email', 'password'] as const),
  PickType(PartialType(CreateUserRoleDto), ['_id'] as const),
) {}
