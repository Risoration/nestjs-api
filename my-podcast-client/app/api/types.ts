export type SearchResult = {
  listenNotesId: string;
  title: string;
  description: string;
  image: string;
};

export type PodcastDetail = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  listenNotesId: string;
  topics: Topic[];
  episodes: Episode[];
};

export type Episode = {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  publishedAt: string;
  duration: number;
  transcriptText?: string;
  episodeTopics?: Topic[];
};

export type Topic = {
  id: string;
  name: string;
};
