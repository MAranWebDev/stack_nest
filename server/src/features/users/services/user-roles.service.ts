import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserRoleDto, UpdateUserRoleDto } from '@/features/users/dtos';
import { UserRoles } from '@/features/users/schemas';

@Injectable()
export class UserRolesService {
  constructor(@InjectModel(UserRoles.name) private userRolesModel: Model<UserRoles>) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    const existingRole = await this.userRolesModel.findOne({ name: createUserRoleDto.name });
    if (existingRole) throw new BadRequestException('Role already exists');

    return this.userRolesModel.create(createUserRoleDto);
  }

  async findAll() {
    return this.userRolesModel.find().exec();
  }

  async findById(id: string) {
    return this.userRolesModel.findById(id).exec();
  }

  async update(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRolesModel.findByIdAndUpdate(id, updateUserRoleDto);
  }
}
