import { OmitType } from '@nestjs/swagger';

import { CreateUserRoleDto } from './create-user-role.dto';

export class UpdateUserRoleDto extends OmitType(CreateUserRoleDto, ['_id'] as const) {}
