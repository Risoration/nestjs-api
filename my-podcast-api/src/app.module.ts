import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episode/episode.module';
import { TopicsModule } from './topics/topic.module';
import { PodcastModule } from './podcast/podcast.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { RssService } from './rss/rss.service';

@Module({
  imports: [EpisodesModule, TopicsModule, PodcastModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, RssService],
})
export class AppModule {}
