import { OmitType } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class LogUserDto extends OmitType(CreateUserDto, ['name'] as const) {}
