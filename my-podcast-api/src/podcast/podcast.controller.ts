import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { CreatePodcastDto } from './dto/podcast.dto';

@Controller('podcasts')
export class PodcastController {
  constructor(private readonly podcastService: PodcastService) {}

  @Post()
  async addPodcast(@Body() podcastData: CreatePodcastDto) {
    return this.podcastService.addPodcast(podcastData.rssUrl);
  }

  @Get()
  async getPodcasts(@Query('id') id: string) {
    if (id) {
      return this.podcastService.findById(id);
    }
    return this.podcastService.findAll();
  }

  @Delete()
  async deletePodcast(@Query('id') id: string) {
    return this.podcastService.deletePodcast(id);
  }

  @Get('search')
  async search(@Query('q') query: string) {
    this.podcastService.searchExternal;
  }
}
