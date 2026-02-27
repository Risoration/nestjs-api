import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePodcastDto {
  @IsString()
  @IsNotEmpty()
  listenNotesId: string;
}
