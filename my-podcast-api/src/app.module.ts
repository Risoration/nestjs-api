import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episode/episode.module';
import { TopicsModule } from './topics/topic.module';
import { PodcastModule } from './podcast/podcast.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { RssService } from './rss/rss.service';
import { AuthService } from './auth/auth.service';
import { Auth } from './auth/auth';
import { AuthModule } from './auth/auth.module';
import { ControllerService } from './module/controller/controller.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EpisodesModule, TopicsModule, PodcastModule, PrismaModule, AuthModule, UsersModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, RssService, AuthService, Auth, ControllerService, UsersService],
})
export class AppModule {}
