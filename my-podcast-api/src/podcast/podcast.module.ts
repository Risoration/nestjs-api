import { Module } from '@nestjs/common';
import { PodcastController } from './podcast.controller';
import { PodcastService } from './podcast.service';
import { EpisodesService } from 'src/episode/episode.service';
import { RssService } from 'src/rss/rss.service';

@Module({
  controllers: [PodcastController],
  providers: [PodcastService, EpisodesService, RssService],
  exports: [PodcastService],
})
export class PodcastModule {}
