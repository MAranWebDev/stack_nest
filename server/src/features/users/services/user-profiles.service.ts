import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PERMISSIONS } from '@/features/users/constants';
import { CreateProfileDto, UpdateProfileDto } from '@/features/users/dtos';
import { UserProfiles } from '@/features/users/schemas';
import { validateNoEmptyObject } from '@/utils/validators';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectModel(UserProfiles.name) private readonly userProfilesModel: Model<UserProfiles>,
  ) {}

  private validatePermissions = (permissions: string[]) => {
    const permissionsArray: string[] = Object.values(PERMISSIONS);

    for (const permission of permissions)
      if (!permissionsArray.includes(permission))
        throw new BadRequestException(`Permission '${permission}' not allowed`);
  };

  async create(createProfileDto: CreateProfileDto) {
    const { _id } = createProfileDto;
    const profile = await this.userProfilesModel.findById(_id).exec();
    if (profile) throw new BadRequestException(`Profile #${_id} already exists`);

    return this.userProfilesModel.create(createProfileDto);
  }

  async findAll() {
    return this.userProfilesModel.find().exec();
  }

  async findOne(id: string) {
    const profile = await this.userProfilesModel.findById(id).exec();
    if (!profile) throw new NotFoundException(`Profile #${id} not found`);
    return profile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    validateNoEmptyObject(updateProfileDto);

    await this.findOne(id);

    const { permissions } = updateProfileDto;
    permissions && this.validatePermissions(permissions);

    await this.userProfilesModel.updateOne({ _id: id }, updateProfileDto);
    return { message: `Profile #${id} updated` };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.userProfilesModel.deleteOne({ _id: id });
    return { message: `Profile #${id} deleted` };
  }
}
