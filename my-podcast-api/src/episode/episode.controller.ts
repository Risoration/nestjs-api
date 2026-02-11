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
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EpisodesService } from './episode.service';
import { CreateEpisodeDto, UpdateEpisodeDto } from './dto/episode.dto';
import { ConfigService } from '../config/config.service';
import { IsPositivePipe } from '../pipes/is-positive/is-positive.pipe';
import { ApiKeyGuard } from 'src/guards/api-key.guard';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
    private configService: ConfigService,
  ) {}
  @Get()
  findEpisodes(
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe)
    limit?: number,
  ) {
    console.log(sort);
    return this.episodesService.findAll(sort);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log(id);
    const episode = await this.episodesService.findOne(id);
    if (!episode) {
      throw new HttpException(
        `Episode with ID: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return episode;
  }

  @UseGuards(ApiKeyGuard)
  @Post()
  create(@Body(ValidationPipe) input: CreateEpisodeDto) {
    console.log(input);
    return this.episodesService.create(input);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    console.log(id);
    const episode = this.episodesService.findOne(id);
    if (!episode) {
      throw new HttpException(
        `Episode with ID: ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    console.log('Deleted episode with ID:', id);
    return this.episodesService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() input: UpdateEpisodeDto) {
    console.log(id, input);
    return this.episodesService.update(id, input);
  }
}
