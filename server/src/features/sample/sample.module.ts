import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SAMPLE_QUEUE } from './constants';
import { SampleProcessor } from './queues';
import { SampleController } from './sample.controller';
import { Sample, SampleSchema } from './schemas';
import { SampleQueueService, SampleService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sample.name, schema: SampleSchema }]),
    BullModule.registerQueue({ name: SAMPLE_QUEUE.NAME }),
    BullBoardModule.forFeature({ name: SAMPLE_QUEUE.NAME, adapter: BullAdapter }),
  ],
  controllers: [SampleController],
  providers: [SampleService, SampleQueueService, SampleProcessor],
})
export class SampleModule {}
