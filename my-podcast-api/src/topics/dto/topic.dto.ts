import { isString, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsString()
  episodeId: string;
}

export class UpdateTopicDto {
  @IsString()
  name: string;
}
