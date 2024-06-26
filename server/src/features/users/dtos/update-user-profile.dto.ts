import { IsCustomPermission } from '@/features/users/decorators';

export class UpdateUserProfileDto {
  @IsCustomPermission()
  profileId: string;
}
