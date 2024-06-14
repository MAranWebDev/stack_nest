import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { UsersRolesService } from '@/features/user-roles/users-roles.service';
import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto } from '@/features/users/dtos';
import { Users } from '@/features/users/schemas';
import { validateMongooseObjectId, validateNoEmptyObject } from '@/utils/validators';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
    private readonly usersRolesService: UsersRolesService,
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

    if (updateUserDto.role) await this.usersRolesService.findOne(updateUserDto.role);

    await this.usersModel.updateOne({ _id: id }, updateUserDto);
    return { message: 'User updated' };
  }

  async updatePassword(id: string, updateUserPasswordDto: UpdateUserPasswordDto) {
    await this.findOne(id);

    const hashedPassword = await this._hashPassword(updateUserPasswordDto.password);
    await this.usersModel.updateOne(
      { _id: id },
      { ...updateUserPasswordDto, password: hashedPassword },
    );
    return { message: 'User password updated' };
  }

  async updateStatus(id: string) {
    const { isActive } = await this.findOne(id);
    await this.usersModel.updateOne({ _id: id }, { isActive: !isActive });
    return { message: 'User status updated' };
  }
}
