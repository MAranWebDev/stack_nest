import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserRoleDto, UpdateUserRoleDto } from '@/features/users/dtos';
import { UserRoles } from '@/features/users/schemas';
import { validateNoEmptyObject } from '@/utils/validators';

@Injectable()
export class UserRolesService {
  constructor(@InjectModel(UserRoles.name) private userRolesModel: Model<UserRoles>) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    return this.userRolesModel.create(createUserRoleDto);
  }

  async findAll() {
    return this.userRolesModel.find().exec();
  }

  async findOne(id: string) {
    const userRole = await this.userRolesModel.findById(id).exec();
    if (!userRole) throw new NotFoundException('User role not found');
    return userRole;
  }

  async update(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    validateNoEmptyObject(updateUserRoleDto);
    await this.findOne(id);
    await this.userRolesModel.updateOne({ _id: id }, updateUserRoleDto);
    return { message: 'User role updated' };
  }

  async updateStatus(id: string) {
    const { isActive } = await this.findOne(id);
    await this.userRolesModel.updateOne({ _id: id }, { isActive: !isActive });
    return { message: 'User role status updated' };
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.userRolesModel.deleteOne({ _id: id });
    return { message: 'User role deleted' };
  }
}
