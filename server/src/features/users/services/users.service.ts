import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto, UpdateUserDto } from '@/features/users/dtos';
import { Users } from '@/features/users/schemas';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersModel.create({ ...createUserDto, role: 'DEFAULT' });
  }

  async findAll() {
    return this.usersModel.find().select('-password').exec();
  }

  async findOneByEmail(email: string) {
    return this.usersModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersModel.findByIdAndUpdate(id, updateUserDto);
  }
}
