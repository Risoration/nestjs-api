import { Injectable, Logger } from '@nestjs/common';
import { Episode } from './entity/episode.entity';
import { CreateEpisodeDto, UpdateEpisodeDto } from './dto/episode.dto';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EpisodesService {
  private readonly logger = new Logger(EpisodesService.name);

  constructor(private readonly prisma: PrismaService) {}

  private episodes: Episode[] = [];

  async findAll(sort: 'asc' | 'desc' = 'asc') {
    const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
    const sortDesc = (a: Episode, b: Episode) => (a.name < b.name ? 1 : -1);

    return sort == 'asc'
      ? this.episodes.sort(sortAsc)
      : this.episodes.sort(sortDesc);
  }

  async findFeatured() {
    return this.episodes.filter((episode) => episode.featured);
  }

  async findOne(id: string) {
    return this.episodes.find((episode) => episode.id === id);
  }

  async create(createEpisodeDto: CreateEpisodeDto) {
    const newEpisode = { ...createEpisodeDto, id: randomUUID() };
    this.episodes.push(newEpisode);

    return newEpisode;
  }

  async delete(id: string) {
    this.episodes = this.episodes.filter((episode) => episode.id !== id);
  }

  async update(id: string, updateEpisodeDto: UpdateEpisodeDto) {
    const episodeIndex = this.episodes.findIndex(
      (episode) => episode.id === id,
    );
    const updatedEpisode = {
      ...this.episodes[episodeIndex],
      ...updateEpisodeDto,
    };
    this.episodes[episodeIndex] = updatedEpisode;
    return updatedEpisode;
  }

  parseDuration(duration: string): number {
    if (!duration) return 0;

    //handle formats "HH:MM:SS" or "MM:SS"
    const parts = duration.split(':').map((part) => parseInt(part, 10));

    if (parts.some(isNaN)) return 0;

    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }

    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }

    return parts[0];
  }

  async ingestFromFeed(podcastId: string, feed: any) {
    if (!feed?.items?.length) {
      this.logger.warn('RSS feed contains no items');
      return;
    }

    for (const item of feed.items) {
      const audioUrl = item.enclosure?.url;

      if (!audioUrl) continue;

      try {
        await this.prisma.episode.upsert({
          where: { audioUrl },
          update: {
            title: item.title ?? '',
            description: item.contentSnippet ?? item.itunesSummary ?? '',
            publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
            duration: this.parseDuration(item.itunesDuration),
          },
          create: {
            audioUrl,
            podcastId,
            title: item.title ?? '',
            description: item.contentSnippet ?? item.itunesSummary ?? '',
            publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
            duration: this.parseDuration(item.itunesDuration),
          },
        });
      } catch (error) {
        this.logger.error(
          `Failed to ingest episode from feed: ${error.message}`,
        );
      }
    }
  }
}
