import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto, CreateUserRoleDto } from './dtos';
import { UserRoles, Users } from './schemas';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<Users>,
    @InjectModel(UserRoles.name) private userRolesModel: Model<UserRoles>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersModel.create({ ...createUserDto, role: 'DEFAULT' });
  }

  async findAll() {
    return this.usersModel.find().select('-password').exec();
  }

  async findOneByEmail(email: string) {
    return this.usersModel.findOne({ email }).exec();
  }

  async findAllRoles() {
    return this.userRolesModel.find().exec();
  }

  async createUserRole(createUserRoleDto: CreateUserRoleDto) {
    const existingRole = await this.userRolesModel.findOne({ name: createUserRoleDto.name });
    if (existingRole) throw new BadRequestException('Role already exists');

    return this.userRolesModel.create(createUserRoleDto);
  }
}
