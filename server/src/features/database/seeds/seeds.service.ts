import { Injectable, Logger } from '@nestjs/common';

import { userProfiles, users } from '@/features/database/data';
import { UserProfilesService, UsersService } from '@/features/users/services';

@Injectable()
export class SeedsService {
  private readonly logger = new Logger(SeedsService.name);

  constructor(
    private readonly userProfilesService: UserProfilesService,
    private readonly usersService: UsersService,
  ) {}

  async seedsUserProfiles() {
    this.logger.log(`Seeding user profiles started`);

    for (const profile of userProfiles) {
      try {
        await this.userProfilesService.create(profile);
      } catch (error) {
        this.logger.error(`Error seeding user profile: ${error.message}`);
      }
    }

    this.logger.log(`Seeding user profiles finished`);
  }

  async seedsUsers() {
    this.logger.log(`Seeding users started`);

    for (const user of users) {
      try {
        await this.usersService.create(user);
      } catch (error) {
        this.logger.error(`Error seeding user: ${error.message}`);
      }
    }

    this.logger.log(`Seeding users finished`);
  }
}
