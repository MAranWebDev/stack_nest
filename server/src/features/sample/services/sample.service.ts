import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSampleDto, UpdateSampleDto } from '@/features/sample/dtos';
import { Sample } from '@/features/sample/sample.schema';

@Injectable()
export class SampleService {
  constructor(@InjectModel(Sample.name) private sampleModel: Model<Sample>) {}

  async create(createSampleDto: CreateSampleDto) {
    return this.sampleModel.create(createSampleDto);
  }

  async findAll() {
    return this.sampleModel.find().exec();
  }

  async findOne(id: string) {
    return this.sampleModel.findById(id).exec();
  }

  async update(id: string, updateSampleDto: UpdateSampleDto) {
    return this.sampleModel.findByIdAndUpdate(id, updateSampleDto);
  }

  async remove(id: string) {
    return this.sampleModel.findByIdAndDelete(id);
  }
}
