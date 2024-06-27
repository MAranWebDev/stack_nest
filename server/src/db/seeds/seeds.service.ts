import { Injectable } from '@nestjs/common';

import { UserProfilesService, UsersService } from '@/features/users/services';

import { userProfiles, users } from './data';

@Injectable()
export class SeedsService {
  constructor(
    private readonly userProfilesService: UserProfilesService,
    private readonly usersService: UsersService,
  ) {}

  async seedsUserProfiles() {
    for (const profile of userProfiles) {
      try {
        await this.userProfilesService.create(profile);
      } catch (error) {
        console.error(`Error seeding user profile: ${error.message}`);
      }
    }
  }

  async seedsUsers() {
    for (const user of users) {
      try {
        await this.usersService.create(user);
      } catch (error) {
        console.error(`Error seeding user: ${error.message}`);
      }
    }
  }
}
