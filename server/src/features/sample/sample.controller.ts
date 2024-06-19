import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateSampleDto, UpdateSampleDto } from './dtos';
import { SampleQueueService, SampleService } from './services';

const ROUTES = {
  SAMPLE: 'sample',
} as const;

@ApiTags(ROUTES.SAMPLE)
@ApiBearerAuth()
@Controller(ROUTES.SAMPLE)
export class SampleController {
  constructor(
    private readonly sampleService: SampleService,
    private readonly sampleQueueService: SampleQueueService,
  ) {}

  @Post()
  // @RequirePermissions(PERMISSIONS.CREATE_SAMPLE)
  create(@Body() createSampleDto: CreateSampleDto) {
    return this.sampleQueueService.create(createSampleDto);
  }

  @Get()
  // @RequirePermissions(PERMISSIONS.READ_SAMPLE)
  findAll() {
    return this.sampleService.findAll();
  }

  @Get(':id')
  // @RequirePermissions(PERMISSIONS.READ_SAMPLE)
  findOne(@Param('id') id: string) {
    return this.sampleService.findOne(id);
  }

  @Patch(':id')
  // @RequirePermissions(PERMISSIONS.UPDATE_SAMPLE)
  update(@Param('id') id: string, @Body() updateSampleDto: UpdateSampleDto) {
    return this.sampleQueueService.update(id, updateSampleDto);
  }

  @Delete(':id')
  // @RequirePermissions(PERMISSIONS.DELETE_SAMPLE)
  remove(@Param('id') id: string) {
    return this.sampleQueueService.remove(id);
  }
}
