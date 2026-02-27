import { Module } from '@nestjs/common';
import { PodcastController } from './podcast.controller';
import { PodcastService } from './podcast.service';
import { EpisodesService } from 'src/episode/episodes.service';
import { RssService } from 'src/rss/rss.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PodcastController],
  providers: [PodcastService, EpisodesService, RssService],
  exports: [PodcastService],
})
export class PodcastModule {}
