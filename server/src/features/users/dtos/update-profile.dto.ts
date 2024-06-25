import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(OmitType(CreateProfileDto, ['_id'] as const)) {}
