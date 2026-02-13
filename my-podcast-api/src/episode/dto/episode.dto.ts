import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { EpisodeTopic } from '@prisma/client';

export class CreateEpisodeDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  audioUrl: string;
  @IsNumber()
  duration: number;
  @IsString()
  podcastId: string;
  @IsArray()
  @IsOptional()
  episodeTopics?: EpisodeTopic[];
  @IsDate()
  @Type(() => Date)
  publishedAt: Date;
  @IsString()
  @IsOptional()
  transcriptText?: string;
  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}

export class UpdateEpisodeDto {
  @IsString()
  @IsOptional()
  title?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsString()
  @IsOptional()
  audioUrl?: string;
  @IsNumber()
  @IsOptional()
  duration?: number;
  @IsString()
  @IsOptional()
  podcastId?: string;
  @IsArray()
  @IsOptional()
  episodeTopics?: EpisodeTopic[];
}
