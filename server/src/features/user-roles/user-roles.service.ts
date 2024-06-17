import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { validateNoEmptyObject } from '@/utils/validators';

import { CreateUserRoleDto, UpdateUserRoleDto } from './dtos';
import { UserRoles } from './schemas';

@Injectable()
export class UserRolesService {
  constructor(@InjectModel(UserRoles.name) private readonly userRolesModel: Model<UserRoles>) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    const userRole = await this.userRolesModel.findById(createUserRoleDto._id).exec();
    if (userRole) throw new BadRequestException('Role already exists');

    return this.userRolesModel.create(createUserRoleDto);
  }

  async findAll() {
    return this.userRolesModel.find().exec();
  }

  async findOne(id: string) {
    const userRole = await this.userRolesModel.findById(id).exec();
    if (!userRole) throw new NotFoundException('Role not found');
    return userRole;
  }

  async update(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    validateNoEmptyObject(updateUserRoleDto);

    await this.findOne(id);

    await this.userRolesModel.updateOne({ _id: id }, updateUserRoleDto);
    return { message: 'Role updated' };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.userRolesModel.deleteOne({ _id: id });
    return { message: 'Role deleted' };
  }
}
