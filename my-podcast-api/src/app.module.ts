import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episode/episode.module';
import { TopicsModule } from './topics/topic.module';
import { PodcastModule } from './podcast/podcast.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { RssService } from './rss/rss.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    EpisodesModule,
    TopicsModule,
    PodcastModule,
    PrismaModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
