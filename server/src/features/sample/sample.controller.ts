import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateSampleDto, UpdateSampleDto } from './dtos';
import { SampleQueueService } from './services/sample-queue.service';
import { SampleService } from './services/sample.service';

@ApiTags('sample')
@ApiBearerAuth()
@Controller('sample')
export class SampleController {
  constructor(
    private readonly sampleService: SampleService,
    private readonly sampleQueueService: SampleQueueService,
  ) {}

  @Post()
  create(@Body() createSampleDto: CreateSampleDto) {
    return this.sampleQueueService.create(createSampleDto);
  }

  @Get()
  findAll() {
    return this.sampleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sampleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSampleDto: UpdateSampleDto) {
    return this.sampleQueueService.update(id, updateSampleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sampleQueueService.remove(id);
  }
}
