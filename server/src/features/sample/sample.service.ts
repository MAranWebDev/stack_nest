import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { Model } from 'mongoose';

import { CreateSampleDto, UpdateSampleDto } from './dtos';
import { SAMPLE_QUEUE } from './sample.processor';
import { Sample } from './sample.schema';

@Injectable()
export class SampleService {
  constructor(
    @InjectModel(Sample.name) private sampleModel: Model<Sample>,
    @InjectQueue(SAMPLE_QUEUE.NAME) private sampleQueue: Queue,
  ) {}

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

  async queueCreate(createSampleDto: CreateSampleDto) {
    await this.sampleQueue.add(SAMPLE_QUEUE.TYPE_CREATE, createSampleDto, { delay: 5000 });
    return 'This will add a new sample soon';
  }

  async queueUpdate(id: string, updateSampleDto: UpdateSampleDto) {
    await this.sampleQueue.add(SAMPLE_QUEUE.TYPE_UPDATE, { id, updateSampleDto }, { delay: 5000 });
    return `This will update #${id} sample soon`;
  }

  async queueRemove(id: string) {
    await this.sampleQueue.add(SAMPLE_QUEUE.TYPE_REMOVE, id, { delay: 5000 });
    return `This will remove #${id} sample soon`;
  }
}
