import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Client } from 'podcast-api';
import axios from 'axios';

@Injectable()
export class PodcastService {
  private client;
  private genreMap: Map<number, string> | null = null; //cache genre map to avoid multiple requests

  constructor(private readonly prisma: PrismaService) {
    this.client = Client({ apiKey: process.env.API_TOKEN });
  }

  private readonly baseUrl = 'https://listen-api.listennotes.com/api/v2';

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

  async addPodcast(listenNotesId: string, userId?: string) {
    const existing = await this.prisma.podcast.findUnique({
      where: { listenNotesId },
    });

    if (existing) {
      if (userId && !existing.userId) {
        return this.prisma.podcast.update({
          where: { id: existing.id },
          data: { userId },
        });
      }
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
        userId: userId ?? undefined,
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

  private async getGenreMap(): Promise<Map<number, string>> {
    if (this.genreMap) return this.genreMap;
    const response = await axios.get(`${this.baseUrl}/genres`, {
      headers: this.headers,
    });
    const map = new Map<number, string>();
    for (const g of response.data.genres || []) {
      map.set(Number(g.id), g.name);
    }
    this.genreMap = map;
    return map;
  }

  async getPodcastWithTopics(id: string) {
    const podcast = await this.findById(id);

    const response = await axios.get(
      `${this.baseUrl}/podcasts/${podcast.listenNotesId}`,
      { headers: this.headers },
    );

    const data = response.data;
    const genreIds: number[] = data.genre_ids ?? [];
    const genreMap = await this.getGenreMap();

    const topics = genreIds
      .map((genreId: number) => {
        const name = genreMap.get(Number(genreId));
        return name ? { id: String(genreId), name } : null;
      })
      .filter(Boolean) as { id: string; name: string }[];

    const lnEpisodes = data.episodes ?? [];
    const episodes = lnEpisodes.map(
      (ep: {
        id?: string;
        title?: string;
        audio?: string;
        description?: string;
        pub_date_ms?: number;
        audio_length_sec?: number;
      }) => {
        return {
          id: ep.id ?? '',
          title: ep.title ?? '',
          description: ep.description ?? '',
          audioUrl: ep.audio ?? '',
          publishedAt: ep.pub_date_ms
            ? new Date(ep.pub_date_ms).toISOString()
            : '',
          duration: ep.audio_length_sec ?? 0,
          transcriptText: undefined,
          episodeTopics: [],
        };
      },
    );

    return {
      ...podcast,
      title: data.title ?? podcast.title,
      description: data.description ?? podcast.description,
      imageUrl: data.image ?? podcast.imageUrl,
      listenNotesId: data.id ?? podcast.listenNotesId,
      topics,
      episodes,
    };
  }
}
