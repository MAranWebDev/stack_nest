import { OmitType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class AuthUserDto extends OmitType(CreateUserDto, ['profileId'] as const) {}
