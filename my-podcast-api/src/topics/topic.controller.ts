import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { TopicsService } from './topic.service';
import { IsPositivePipe } from 'src/pipes/is-positive/is-positive.pipe';
import { CreateTopicDto, UpdateTopicDto } from './dto/topic.dto';

@Controller('topics')
export class TopicsController {
  constructor(
    private topicsService: TopicsService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll(
    @Query('sort') sort: 'asc' | 'desc' = 'asc',
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe, IsPositivePipe)
    limit?: number,
  ) {
    return this.topicsService.findAll(sort);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const topic = this.topicsService.findOne(id);
    if (!topic) {
      throw new HttpException(
        `Topic with ID: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return topic;
  }

  @Post()
  create(@Body(ValidationPipe) input: CreateTopicDto) {
    console.log(input);
    return 'Added a new topic';
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const topic = this.topicsService.findOne(id);
    if (!topic) {
      throw new HttpException(
        `Topic with ID: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.topicsService.delete(id);
    return `Deleted topic with ID: ${id}`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) input: UpdateTopicDto) {
    const topic = this.topicsService.findOne(id);
    console.log(id, input);
    if (!topic) {
      throw new HttpException(
        `Topic with ID: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.topicsService.update(id, input);
  }
}
