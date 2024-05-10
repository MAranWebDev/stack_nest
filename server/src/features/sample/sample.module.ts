import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SampleController } from './sample.controller';
import { SampleProcessor } from './sample.processor';
import { Sample, SampleSchema } from './sample.schema';
import { SampleService } from './sample.service';
import { QueuesEnum } from './types';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sample.name, schema: SampleSchema }]),
    BullModule.registerQueue({ name: QueuesEnum.TEST }),
    BullBoardModule.forFeature({ name: QueuesEnum.TEST, adapter: BullAdapter }),
  ],
  controllers: [SampleController],
  providers: [SampleService, SampleProcessor],
})
export class SampleModule {}
