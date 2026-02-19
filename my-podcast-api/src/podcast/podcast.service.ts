import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Client } from 'podcast-api';
import axios from 'axios';

@Injectable()
export class PodcastService {
  private client;
  constructor(private readonly prisma: PrismaService) {
    this.client = Client({ apiKey: process.env.API_TOKEN });
  }

  private readonly baseUrl = 'https://listen-api.listennoutes.com/api/v2';

  private get headers() {
    return {
      'X-ListenAPI-Key': process.env.API_TOKEN,
    };
  }

  // 🔎 Search podcasts externally
  async searchExternal(query: string) {
    const response = await axios.get(`${this.baseUrl}/search`, {
      headers: this.headers,
      params: {
        q: query,
        type: 'podcast',
      },
    });

    return response.data.results.map((podcast: any) => ({
      listenNotesId: podcast.id,
      title: podcast.title_original,
      description: podcast.description_original,
      image: podcast.image,
    }));
  }

  async addPodcast(listenNotesId: string) {
    const existing = await this.prisma.podcast.findUnique({
      where: { listenNotesId },
    });

    if (existing) {
      return existing;
    }

    const response = await axios.get(
      `${this.baseUrl}/podcasts/${listenNotesId}`,
      { headers: this.headers },
    );

    const data = response.data;

    return this.prisma.podcast.create({
      data: {
        listenNotesId: data.id,
        title: data.title,
        description: data.description,
        imageUrl: data.image,
      },
    });
  }

  async findById(id: string) {
    const podcast = await this.prisma.podcast.findUnique({
      where: { id },
    });

    if (!podcast) {
      throw new NotFoundException('Podcast not found');
    }

    return podcast;
  }

  async findByListenNotesId(listenNotesId: string) {
    return this.prisma.podcast.findUnique({
      where: { listenNotesId },
    });
  }

  async findAll() {
    return this.prisma.podcast.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async deletePodcast(id: string) {
    return this.prisma.podcast.delete({
      where: { id },
    });
  }
}
