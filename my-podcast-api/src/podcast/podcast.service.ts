import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
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

  private async fetchListenNotesPodcastData(listenNotesId: string) {
    const response = await axios.get(
      `${this.baseUrl}/podcasts/${listenNotesId}`,
      { headers: this.headers },
    );
    return response.data;
  }

  private async buildTopicsFromGenreIds(
    genreIds: number[],
  ): Promise<{ id: string; name: string }[]> {
    const genreMap = await this.getGenreMap();
    return genreIds
      .map((genreId: number) => {
        const name = genreMap.get(Number(genreId));
        return name ? { id: String(genreId), name } : null;
      })
      .filter((x): x is { id: string; name: string } => x !== null);
  }

  private buildEpisodesFromLnData(
    lnEpisodes: {
      id?: string;
      title?: string;
      audio?: string;
      description?: string;
      pub_date_ms?: number;
      audio_length_sec?: number;
    }[],
  ) {
    return (lnEpisodes ?? []).map((ep) => ({
      id: ep.id ?? '',
      title: ep.title ?? '',
      description: ep.description ?? '',
      audioUrl: ep.audio ?? '',
      publishedAt: ep.pub_date_ms
        ? new Date(ep.pub_date_ms).toISOString()
        : '',
      duration: ep.audio_length_sec ?? 0,
      transcriptText: undefined as string | undefined,
      episodeTopics: [] as { id: string; name: string }[],
    }));
  }

  async getPodcastWithTopics(id: string) {
    const podcast = await this.findById(id);
    const data = await this.fetchListenNotesPodcastData(podcast.listenNotesId);
    const topics = await this.buildTopicsFromGenreIds(data.genre_ids ?? []);
    const episodes = this.buildEpisodesFromLnData(data.episodes ?? []);
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

  /** Resolve podcast detail by internal id or listenNotesId; supports recommendations not yet in DB. */
  async getPodcastDetail(idOrListenNotesId: string) {
    try {
      const byId = await this.findById(idOrListenNotesId);
      return this.getPodcastWithTopics(byId.id);
    } catch {
      const byListenNotesId = await this.findByListenNotesId(idOrListenNotesId);
      if (byListenNotesId) {
        return this.getPodcastWithTopics(byListenNotesId.id);
      }
      return this.getPodcastWithTopicsByListenNotesId(idOrListenNotesId);
    }
  }

  private async getPodcastWithTopicsByListenNotesId(listenNotesId: string) {
    const data = await this.fetchListenNotesPodcastData(listenNotesId);
    const topics = await this.buildTopicsFromGenreIds(data.genre_ids ?? []);
    const episodes = this.buildEpisodesFromLnData(data.episodes ?? []);
    return {
      id: listenNotesId,
      listenNotesId,
      title: data.title ?? '',
      description: data.description ?? '',
      imageUrl: data.image ?? null,
      publisher: data.publisher ?? null,
      createdAt: new Date(),
      topics,
      episodes,
    };
  }

  async getUserFavouriteGenres(
    userId: string,
    limit = 5,
  ): Promise<{ id: number; name: string; count: number }[]> {
    const podcasts = await this.prisma.podcast.findMany({
      where: { userId },
      select: { listenNotesId: true },
    });

    if (!podcasts.length) {
      return [];
    }

    const genreCounts = new Map<number, number>();

    for (const p of podcasts) {
      try {
        const response = await axios.get(
          `${this.baseUrl}/podcasts/${p.listenNotesId}`,
          { headers: this.headers },
        );
        const genreIds: number[] = response.data.genre_ids ?? [];
        for (const id of genreIds) {
          genreCounts.set(id, (genreCounts.get(id) ?? 0) + 1);
        }
      } catch {
        // skip single podcast fetch failure; continue with others
      }
    }

    const sorted = [...genreCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);

    const genreMap = await this.getGenreMap();

    return sorted
      .map(([id, count]) => {
        const name = genreMap.get(id);
        if (!name) return null;
        return { id, name, count };
      })
      .filter(
        (x): x is { id: number; name: string; count: number } => x !== null,
      );
  }

  async getRecommendationsForUser(userId: string): Promise<
    {
      listenNotesId: string;
      title: string;
      description: string;
      image: string;
    }[]
  > {
    const favourites = await this.getUserFavouriteGenres(userId);
    if (!favourites.length) {
      return [];
    }

    const genreIdsParam = favourites.map((f) => f.id).join(',');
    const userPodcasts = await this.prisma.podcast.findMany({
      where: { userId },
      select: { listenNotesId: true },
    });
    const ownedIds = new Set(userPodcasts.map((p) => p.listenNotesId));

    try {
      const response = await axios.get(`${this.baseUrl}/search`, {
        headers: this.headers,
        params: {
          q: favourites.map((f) => f.name).join(',  '),
          type: 'podcast',
          genre_ids: genreIdsParam,
        },
      });

      const results = response.data?.results ?? [];
      return results
        .filter((podcast: { id: string }) => !ownedIds.has(podcast.id))
        .map((podcast: any) => ({
          listenNotesId: podcast.id,
          title: podcast.title_original ?? '',
          description: podcast.description_original ?? '',
          image: podcast.image ?? '',
        }));
    } catch {
      throw new ServiceUnavailableException(
        'Unable to fetch recommendations. Please try again later.',
      );
    }
  }
}
