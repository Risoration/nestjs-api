import { Body, Controller, Get, Post } from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { CreatePodcastDto } from './dto/podcast.dto';

@Controller('podcast')
export class PodcastController {
  constructor(private readonly podcastService: PodcastService) {}

  @Post()
  async addPodcast(@Body() podcastData: CreatePodcastDto) {
    return this.podcastService.addPodcast(podcastData.rssUrl);
  }

  @Get()
  async getPodcasts() {
    return this.podcastService.findAll();
  }

  @Get(':id')
  async getPodcastById(id: string) {
    return this.podcastService.findById(id);
  }
}
