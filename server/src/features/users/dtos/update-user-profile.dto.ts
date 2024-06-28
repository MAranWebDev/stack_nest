import { PickType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserProfileDto extends PickType(CreateUserDto, ['profileId'] as const) {}
