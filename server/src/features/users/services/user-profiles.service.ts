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

  private validateAndRemoveDuplicatePermissions = (permissions: string[]) => {
    // Prevent empty array
    if (permissions.length === 0) return [];

    const uniquePermissions = [...new Set(permissions)]; // Remove duplicates
    const allowedPermissions: string[] = Object.values(PERMISSIONS);

    // Validate permissions
    uniquePermissions.forEach((permission) => {
      if (!allowedPermissions.includes(permission))
        throw new BadRequestException(`Permission '${permission}' not found`);
    });

    // Return unique permissions
    return uniquePermissions as PERMISSIONS[];
  };

  async create(createProfileDto: CreateProfileDto) {
    const { _id, permissions } = createProfileDto;

    // Check if profile is duplicated
    const existingProfile = await this.userProfilesModel.findById(_id).exec();
    if (existingProfile) throw new BadRequestException(`Profile #${_id} already exists`);

    // Validate and set permissions if provided
    if (permissions) {
      createProfileDto.permissions = this.validateAndRemoveDuplicatePermissions(permissions);
    }

    // Create and return the new profile
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
    await this.findOne(id); // Check if profile exists

    // Validate and set permissions if provided
    const { permissions } = updateProfileDto;
    if (permissions) {
      updateProfileDto.permissions = this.validateAndRemoveDuplicatePermissions(permissions);
    }

    // Update profile and return a message
    await this.userProfilesModel.updateOne({ _id: id }, updateProfileDto);
    return { message: `Profile #${id} updated` };
  }

  async remove(id: string) {
    await this.findOne(id); // Check if profile exists

    // Delete profile and return a message
    await this.userProfilesModel.deleteOne({ _id: id });
    return { message: `Profile #${id} deleted` };
  }
}
