import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SampleController } from './sample.controller';
import { SAMPLE_QUEUE, SampleProcessor } from './sample.processor';
import { Sample, SampleSchema } from './sample.schema';
import { SampleService } from './sample.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sample.name, schema: SampleSchema }]),
    BullModule.registerQueue({ name: SAMPLE_QUEUE.NAME }),
    BullBoardModule.forFeature({ name: SAMPLE_QUEUE.NAME, adapter: BullAdapter }),
  ],
  controllers: [SampleController],
  providers: [SampleService, SampleProcessor],
})
export class SampleModule {}
