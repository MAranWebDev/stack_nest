import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from '@/features/users/dtos';
import { Users } from '@/features/users/schemas';
import { validateMongooseObjectId, validateNoEmptyObject } from '@/utils/validators';

import { UserProfilesService } from './user-profiles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
    private readonly userProfilesService: UserProfilesService,
  ) {}

  private async _hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this._hashPassword(createUserDto.password);
    return this.usersModel.create({ ...createUserDto, password: hashedPassword });
  }

  async findAll() {
    return this.usersModel.find().select('-password').exec();
  }

  async findOne(id: string) {
    validateMongooseObjectId(id);

    const user = await this.usersModel.findById(id).select('-password').exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOneByEmail(email: string) {
    return this.usersModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    validateNoEmptyObject(updateUserDto);

    await this.findOne(id);

    const { profile } = updateUserDto;
    if (profile) await this.userProfilesService.findOne(profile);

    await this.usersModel.updateOne({ _id: id }, updateUserDto);
    return { message: 'User updated' };
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    await this.findOne(id);

    const hashedPassword = await this._hashPassword(updatePasswordDto.password);
    await this.usersModel.updateOne(
      { _id: id },
      { ...updatePasswordDto, password: hashedPassword },
    );
    return { message: 'Password updated' };
  }

  async updateStatus(id: string) {
    const { isActive } = await this.findOne(id);
    await this.usersModel.updateOne({ _id: id }, { isActive: !isActive });
    const newStatus = isActive ? 'disabled' : 'enabled';
    return { message: `User ${newStatus}` };
  }
}
