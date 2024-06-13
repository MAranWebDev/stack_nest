import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateUserRoleDto } from './create-user-role.dto';

export class UpdateUserRoleDto extends PartialType(OmitType(CreateUserRoleDto, ['_id'] as const)) {}
