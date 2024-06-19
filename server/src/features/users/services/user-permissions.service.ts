import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserPermissionDto, UpdateUserPermissionDto } from '@/features/users/dtos';
import { UserPermissions } from '@/features/users/schemas';
import { validateNoEmptyObject } from '@/utils/validators';

@Injectable()
export class UserPermissionsService {
  constructor(
    @InjectModel(UserPermissions.name)
    private readonly userPermissionsModel: Model<UserPermissions>,
  ) {}

  async create(createUserPermissionDto: CreateUserPermissionDto) {
    const { _id } = createUserPermissionDto;
    const permission = await this.userPermissionsModel.findById(_id).exec();
    if (permission) throw new BadRequestException(`Permission ${_id} already exists`);

    return this.userPermissionsModel.create(createUserPermissionDto);
  }

  async findAll() {
    return this.userPermissionsModel.find().exec();
  }

  async findOne(id: string) {
    const permission = await this.userPermissionsModel.findById(id).exec();
    if (!permission) throw new NotFoundException(`Permission ${id} not found`);
    return permission;
  }

  async update(id: string, updateUserPermissionDto: UpdateUserPermissionDto) {
    validateNoEmptyObject(updateUserPermissionDto);

    await this.findOne(id);

    await this.userPermissionsModel.updateOne({ _id: id }, updateUserPermissionDto);
    return { message: `Permission ${id} updated` };
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.userPermissionsModel.deleteOne({ _id: id });
    return { message: `Permission ${id} deleted` };
  }
}
