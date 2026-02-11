import { Injectable, Logger } from '@nestjs/common';
import { CreateEpisodeDto, UpdateEpisodeDto } from './dto/episode.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EpisodesService {
  private readonly logger = new Logger(EpisodesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(sort: 'asc' | 'desc' = 'asc') {
    return this.prisma.episode.findMany({
      orderBy: {
        publishedAt: sort === 'asc' ? 'asc' : 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.episode.findUnique({
      where: { id },
    });
  }

  async create(createEpisodeDto: CreateEpisodeDto) {
    return this.prisma.episode.create({
      data: {
        title: createEpisodeDto.title,
        description: createEpisodeDto.description,
        audioUrl: createEpisodeDto.audioUrl,
        duration: createEpisodeDto.duration,
        podcastId: createEpisodeDto.podcastId,
        publishedAt: createEpisodeDto.publishedAt,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.episode.delete({
      where: { id },
    });
  }

  async update(id: string, updateEpisodeDto: UpdateEpisodeDto) {
    return this.prisma.episode.update({
      where: { id },
      data: {
        title: updateEpisodeDto.title,
        description: updateEpisodeDto.description,
        audioUrl: updateEpisodeDto.audioUrl,
        duration: updateEpisodeDto.duration,
        podcastId: updateEpisodeDto.podcastId,
      },
    });
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

  // TODO: this is not used anymore, but could be useful in the future
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
