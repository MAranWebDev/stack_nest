import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';

import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto } from '@/features/users/dtos';
import { Users } from '@/features/users/schemas';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  async _hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this._hashPassword(createUserDto.password);
    return this.usersModel.create({
      ...createUserDto,
      role: 'DEFAULT',
      password: hashedPassword,
    });
  }

  async findAll() {
    return this.usersModel.find().select('-password').exec();
  }

  async findOne(id: string) {
    const isObjectIdValid = Types.ObjectId.isValid(id);
    if (!isObjectIdValid) throw new BadRequestException('Incorrect user id format');

    const user = await this.usersModel.findById(id).select('-password').exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOneByEmail(email: string) {
    return this.usersModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const numberOfValues = Object.keys(updateUserDto).length;
    if (numberOfValues === 0) throw new BadRequestException('Enter at least one value');

    const { _id } = await this.findOne(id);
    return this.usersModel.updateOne({ _id }, updateUserDto);
  }

  async updatePassword(id: string, updateUserPasswordDto: UpdateUserPasswordDto) {
    const { _id } = await this.findOne(id);
    const hashedPassword = await this._hashPassword(updateUserPasswordDto.password);
    return this.usersModel.updateOne(
      { _id },
      { ...updateUserPasswordDto, password: hashedPassword },
    );
  }
}
