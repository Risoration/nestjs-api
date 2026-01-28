import { IsString } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
}

export class UpdateTopicDto {
  @IsString()
  name: string;
}
