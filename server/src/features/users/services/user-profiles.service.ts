import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserProfileDto, UpdateUserProfileDto } from '@/features/users/dtos';
import { UserProfiles } from '@/features/users/schemas';
import { validateNoEmptyObject } from '@/utils/validators';

import { UserPermissionsService } from './user-permissions.service';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectModel(UserProfiles.name) private readonly userProfilesModel: Model<UserProfiles>,
    private readonly userPermissionsService: UserPermissionsService,
  ) {}

  async create(createUserProfileDto: CreateUserProfileDto) {
    const { _id } = createUserProfileDto;
    const profile = await this.userProfilesModel.findById(_id).exec();
    if (profile) throw new BadRequestException(`Profile ${_id} already exists`);

    return this.userProfilesModel.create(createUserProfileDto);
  }

  async findAll() {
    return this.userProfilesModel.find().exec();
  }

  async findOne(id: string) {
    const profile = await this.userProfilesModel.findById(id).exec();
    if (!profile) throw new NotFoundException(`Profile ${id} not found`);
    return profile;
  }

  async update(id: string, updateUserProfileDto: UpdateUserProfileDto) {
    validateNoEmptyObject(updateUserProfileDto);

    await this.findOne(id);

    const { permissions } = updateUserProfileDto;
    if (permissions?.length > 0) {
      for (const permission of permissions) {
        await this.userPermissionsService.findOne(permission);
      }
    }

    await this.userProfilesModel.updateOne({ _id: id }, updateUserProfileDto);
    return { message: `Profile ${id} updated` };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.userProfilesModel.deleteOne({ _id: id });
    return { message: `Profile ${id} deleted` };
  }
}
