import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

import { CreateSampleDto, UpdateSampleDto } from '@/features/sample/dtos';
import { SAMPLE_QUEUE } from '@/features/sample/sample.processor';

@Injectable()
export class SampleQueueService {
  private readonly DELAY_TIME = 10000;

  constructor(@InjectQueue(SAMPLE_QUEUE.NAME) private sampleQueue: Queue) {}

  async create(createSampleDto: CreateSampleDto) {
    await this.sampleQueue.add(SAMPLE_QUEUE.TYPE_CREATE, createSampleDto, {
      delay: this.DELAY_TIME,
    });
    return 'This will add a new sample soon';
  }

  async update(id: string, updateSampleDto: UpdateSampleDto) {
    await this.sampleQueue.add(
      SAMPLE_QUEUE.TYPE_UPDATE,
      { id, updateSampleDto },
      { delay: this.DELAY_TIME },
    );
    return `This will update #${id} sample soon`;
  }

  async remove(id: string) {
    await this.sampleQueue.add(SAMPLE_QUEUE.TYPE_REMOVE, id, { delay: this.DELAY_TIME });
    return `This will remove #${id} sample soon`;
  }
}
