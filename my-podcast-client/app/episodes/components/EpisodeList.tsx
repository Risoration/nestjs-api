'use client';

import { Episode } from '@/app/api/types';
import { inter } from '@/app/ui/fonts';

type EpisodeListProps = {
  episodes: Episode[];
};

function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return '';
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return remainingMins ? `${hours} hr ${remainingMins} min` : `${hours} hr`;
}

function formatDate(isoDate: string): string {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function truncate(text: string, maxLength: number): string {
  if (!text) return '';
  const stripped = text.replace(/<[^>]*>/g, '').trim();
  if (stripped.length <= maxLength) return stripped;
  return stripped.slice(0, maxLength).trim() + '…';
}

export default function EpisodeList({ episodes }: EpisodeListProps) {
  if (!episodes?.length) {
    return (
      <p className={`${inter.className} text-zinc-500 text-sm`}>
        No episodes available for this podcast.
      </p>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      {episodes.map((episode) => (
        <article
          key={episode.id}
          className='flex flex-col gap-3 rounded-xl border border-teal-500/10 bg-zinc-900/50 p-4 transition-colors hover:border-teal-500/20'
        >
          <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
            <h3
              className={`${inter.className} font-medium text-zinc-100 text-base leading-snug`}
            >
              {episode.title}
            </h3>
            <div className='flex items-center gap-3 text-zinc-500 text-sm'>
              {episode.duration > 0 && (
                <span>{formatDuration(episode.duration)}</span>
              )}
              {episode.publishedAt && (
                <time dateTime={episode.publishedAt}>
                  {formatDate(episode.publishedAt)}
                </time>
              )}
            </div>
          </div>
          {episode.description && (
            <p className={`${inter.className} text-zinc-400 text-sm`}>
              {truncate(episode.description, 200)}
            </p>
          )}
          <div className='flex flex-row gap-2'>
            <div className='flex-1'>
              {episode.audioUrl && (
                <audio
                  src={episode.audioUrl}
                  controls
                  preload='metadata'
                  className='w-full mt-1 max-w-md'
                >
                  <track kind='captions' />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
