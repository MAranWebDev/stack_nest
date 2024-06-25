import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RequirePermission } from '@/features/auth/decorators';
import { PERMISSIONS } from '@/features/users/constants';

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
  @RequirePermission(PERMISSIONS.CREATE_SAMPLE)
  create(@Body() createSampleDto: CreateSampleDto) {
    return this.sampleQueueService.create(createSampleDto);
  }

  @Get()
  @RequirePermission(PERMISSIONS.READ_SAMPLE)
  findAll() {
    return this.sampleService.findAll();
  }

  @Get(':id')
  @RequirePermission(PERMISSIONS.READ_SAMPLE)
  findOne(@Param('id') id: string) {
    return this.sampleService.findOne(id);
  }

  @Patch(':id')
  @RequirePermission(PERMISSIONS.UPDATE_SAMPLE)
  update(@Param('id') id: string, @Body() updateSampleDto: UpdateSampleDto) {
    return this.sampleQueueService.update(id, updateSampleDto);
  }

  @Delete(':id')
  @RequirePermission(PERMISSIONS.DELETE_SAMPLE)
  remove(@Param('id') id: string) {
    return this.sampleQueueService.remove(id);
  }
}
