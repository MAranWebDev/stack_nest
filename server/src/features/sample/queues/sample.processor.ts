import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

import { SampleService } from '@/features/sample/services';
import { SAMPLE_QUEUE } from '@/features/sample/utils';

@Processor(SAMPLE_QUEUE.NAME)
export class SampleProcessor {
  private readonly logger = new Logger(SampleProcessor.name);

  constructor(private sampleService: SampleService) {}

  @Process(SAMPLE_QUEUE.TYPE_CREATE)
  async create(job: Job) {
    const response = await this.sampleService.create(job.data);
    this.logger.debug(`record created with response: ${response}`);
    return response;
  }

  @Process(SAMPLE_QUEUE.TYPE_UPDATE)
  async update(job: Job) {
    const response = await this.sampleService.update(job.data.id, job.data.updateSampleDto);
    this.logger.debug(`record updated with response: ${response}`);
  }

  @Process(SAMPLE_QUEUE.TYPE_REMOVE)
  async remove(job: Job) {
    const response = await this.sampleService.remove(job.data);
    this.logger.debug(`record removed with response: ${response}`);
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
