import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { CreatePodcastDto } from './dto/podcast.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { CurrentUser } from 'src/auth/decorators/current-user-decorator';

interface JwtUser {
  id: string;
  email: string;
}

@Controller('podcasts')
export class PodcastController {
  constructor(private readonly podcastService: PodcastService) {}

  @Get('search')
  async search(@Query('q') query: string) {
    return this.podcastService.searchExternal(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('favourites')
  async getFavourites(@CurrentUser() user: JwtUser) {
    return this.podcastService.getUserFavouriteGenres(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('recommendations')
  async getRecommendations(@CurrentUser() user: JwtUser) {
    return this.podcastService.getRecommendationsForUser(user.id);
  }

  @Get(':id')
  async getPodcastDetail(@Param('id') id: string) {
    return this.podcastService.getPodcastDetail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addPodcast(
    @CurrentUser() user: JwtUser,
    @Body() podcastData: CreatePodcastDto,
  ) {
    return this.podcastService.addPodcast(podcastData.listenNotesId, user.id);
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
}
