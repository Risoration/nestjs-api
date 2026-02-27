import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEpisodeDto, UpdateEpisodeDto } from './dto/episode.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EpisodesService {
  private readonly logger = new Logger(EpisodesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(sort: 'asc' | 'desc' = 'asc', limit?: number) {
    return this.prisma.episode.findMany({
      orderBy: {
        publishedAt: sort === 'asc' ? 'asc' : 'desc',
      },
      take: limit,
    });
  }

  async findOne(id: string) {
    return this.prisma.episode.findUnique({
      where: { id },
    });
  }

  async create(dto: CreateEpisodeDto) {
    const existing = await this.prisma.episode.findUnique({
      where: { audioUrl: dto.audioUrl },
    });

    if (existing) {
      throw new NotFoundException(
        `Episode with audio URL: ${dto.audioUrl} already exists`,
      );
    }

    return this.prisma.episode.create({
      data: {
        ...dto,
        episodeTopics: dto.episodeTopics
          ? { create: dto.episodeTopics }
          : undefined,
      },
    });
  }

  async delete(id: string) {
    const episode = await this.prisma.episode.findUnique({
      where: { id },
    });

    if (!episode) {
      throw new NotFoundException(`Episode with ID: ${id} not found`);
    }

    return this.prisma.episode.delete({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateEpisodeDto) {
    const episode = await this.prisma.episode.findUnique({
      where: { id },
    });

    if (!episode) {
      throw new NotFoundException(`Episode with ID: ${id} not found`);
    }

    return this.prisma.episode.update({
      where: { id },
      data: {
        ...dto,
        episodeTopics: dto.episodeTopics
          ? { set: dto.episodeTopics }
          : undefined,
      },
    });
  }
}
