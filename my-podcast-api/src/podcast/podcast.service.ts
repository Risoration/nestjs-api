import { Injectable } from '@nestjs/common';
import { EpisodesService } from 'src/episode/episode.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RssService } from 'src/rss/rss.service';

@Injectable()
export class PodcastService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly episodesService: EpisodesService,
    private readonly rssService: RssService,
  ) {}

  async addPodcast(rssUrl: string) {
    const existing = await this.prisma.podcast.findUnique({
      where: { rssUrl },
    });

    //check 1 - podcast already exists
    if (existing) return existing;

    let feed;
    try {
      feed = await this.rssService.fetchFeed(rssUrl);
    } catch (error) {
      throw new Error('Failed to fetch or parse RSS feed');
    }

    const newPodcast = await this.prisma.podcast.create({
      data: {
        rssUrl,
        title: feed.title ?? '',
        description: feed.description ?? '',
        imageUrl: feed.image?.url ?? '',
      },
    });

    // await this.episodesService.ingestFromFeed(newPodcast.id, feed);

    return newPodcast;
  }

  async findAll() {
    return this.prisma.podcast.findMany();
  }

  async findById(id: string) {
    return this.prisma.podcast.findUnique({
      where: { id },
    });
  }
}
