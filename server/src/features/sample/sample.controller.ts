import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateSampleDto, UpdateSampleDto } from './dtos';
import { SampleService } from './sample.service';

@ApiTags('sample')
@ApiBearerAuth()
@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  create(@Body() createSampleDto: CreateSampleDto) {
    return this.sampleService.create(createSampleDto);
  }

  @Get()
  findAll() {
    return this.sampleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sampleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSampleDto: UpdateSampleDto) {
    return this.sampleService.update(+id, updateSampleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sampleService.remove(+id);
  }
}
