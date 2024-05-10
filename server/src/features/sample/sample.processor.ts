import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';

import { Sample } from './sample.schema';

export enum SAMPLE_QUEUE {
  NAME = 'test',
  TYPE_CREATE = 'create',
  TYPE_UPDATE = 'update',
  TYPE_REMOVE = 'remove',
}

@Processor(SAMPLE_QUEUE.NAME)
export class SampleProcessor {
  private readonly logger = new Logger(SampleProcessor.name);

  constructor(@InjectModel(Sample.name) private sampleModel: Model<Sample>) {}

  @Process(SAMPLE_QUEUE.TYPE_CREATE)
  async create(job: Job) {
    await this.sampleModel.create(job.data);
    this.logger.debug('record created');
  }

  @Process(SAMPLE_QUEUE.TYPE_UPDATE)
  async update(job: Job) {
    await this.sampleModel.findByIdAndUpdate(job.data.id, job.data.updateSampleDto);
    this.logger.debug('record updated');
  }

  @Process(SAMPLE_QUEUE.TYPE_REMOVE)
  async remove(job: Job) {
    await this.sampleModel.findByIdAndDelete(job.data);
    this.logger.debug('record removed');
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(`Active ${job.id}`);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    this.logger.log(`Completed ${job.id}`);
  }

  @OnQueueFailed()
  onFailed(job: Job) {
    this.logger.error(`Failed ${job.id}`);
  }
}
