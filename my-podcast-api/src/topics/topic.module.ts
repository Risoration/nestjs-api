import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { TopicsService } from './topic.service';
import { TopicsController } from './topic.controller';

@Module({
  imports: [ConfigModule],
  providers: [TopicsService],
  controllers: [TopicsController],
})
export class TopicsModule {}
