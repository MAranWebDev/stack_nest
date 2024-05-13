import { BullAdapter } from '@bull-board/api/bullAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '@/features/users/users.module';

import { SampleController } from './sample.controller';
import { SAMPLE_QUEUE, SampleProcessor } from './sample.processor';
import { Sample, SampleSchema } from './sample.schema';
import { SampleQueueService, SampleService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sample.name, schema: SampleSchema }]),
    BullModule.registerQueue({ name: SAMPLE_QUEUE.NAME }),
    BullBoardModule.forFeature({ name: SAMPLE_QUEUE.NAME, adapter: BullAdapter }),
    UsersModule,
  ],
  controllers: [SampleController],
  providers: [SampleService, SampleQueueService, SampleProcessor],
})
export class SampleModule {}
