import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dtos';
import { Users } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersModel.create(createUserDto);
  }

  async findAll() {
    return this.usersModel.find().exec();
  }

  async findOneByEmail(email: string) {
    return this.usersModel.findOne({ email }).exec();
  }
}
