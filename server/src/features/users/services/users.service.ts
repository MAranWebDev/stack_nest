import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { PROFILES } from '@/features/users/constants';
import { CreateUserDto, UpdateUserDto, UpdateUserProfileDto } from '@/features/users/dtos';
import { Users } from '@/features/users/schemas';
import { validateMongooseObjectId, validateNoEmptyObject } from '@/utils/validators';

import { UserProfilesService } from './user-profiles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
    private readonly userProfilesService: UserProfilesService,
  ) {}

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async create(createUserDto: CreateUserDto) {
    // Check if user already exists
    const existingUser = await this.findOneByEmail(createUserDto.email);
    if (existingUser) throw new BadRequestException('Email already exists');

    // Check if default profile exists
    await this.userProfilesService.findOne(PROFILES.USER);

    // Hash the password
    const hashedPassword = await this.hashPassword(createUserDto.password);

    // Create and return the new user
    return this.usersModel.create({
      ...createUserDto,
      profileId: PROFILES.USER,
      password: hashedPassword,
    });
  }

  async findAll() {
    return this.usersModel.find().select('-password').exec();
  }

  async findOne(id: string) {
    validateMongooseObjectId(id);

    // Check if user exists and return it
    const user = await this.usersModel.findById(id).select('-password').exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOneByEmail(email: string) {
    return this.usersModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    validateNoEmptyObject(updateUserDto);
    await this.findOne(id); // Check if user exists

    // Validate, hash and set password if provided
    const { password } = updateUserDto;
    if (password) {
      updateUserDto.password = await this.hashPassword(password);
    }

    // Update user and return a message
    await this.usersModel.updateOne({ _id: id }, updateUserDto);
    return { message: 'User updated' };
  }

  async updateProfile(id: string, updateUserProfileDto: UpdateUserProfileDto) {
    await this.findOne(id); // Check if user exists
    await this.userProfilesService.findOne(updateUserProfileDto.profileId); // Check if profile exists

    // Update user profile and return a message
    await this.usersModel.updateOne({ _id: id }, updateUserProfileDto);
    return { message: 'User profile updated' };
  }
}
