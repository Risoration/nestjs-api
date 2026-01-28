import { Injectable } from '@nestjs/common';
import { Topic } from './entity/topic.entity';
import { CreateTopicDto, UpdateTopicDto } from './dto/topic.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TopicsService {
  private topics: Topic[] = [];

  async findAll(sort: 'asc' | 'desc' = 'asc') {
    const sortAsc = (a: Topic, b: Topic) => (a.name > b.name ? 1 : -1);
    const sortDesc = (a: Topic, b: Topic) => (a.name < b.name ? 1 : -1);

    return sort == 'asc'
      ? this.topics.sort(sortAsc)
      : this.topics.sort(sortDesc);
  }

  async findOne(id: string) {
    return this.topics.find((topic) => topic.id === id);
  }

  async create(createTopicDto: CreateTopicDto) {
    const newTopic = { ...createTopicDto, id: randomUUID() };
    this.topics.push(newTopic);

    return newTopic;
  }

  async delete(id: string) {
    this.topics = this.topics.filter((topic) => topic.id !== id);
  }

  async update(id: string, updateTopicDto: UpdateTopicDto) {
    const topicIndex = this.topics.findIndex((topic) => topic.id === id);
    const updatedTopic = {
      ...this.topics[topicIndex],
      ...updateTopicDto,
    };
    this.topics[topicIndex] = updatedTopic;
    return updatedTopic;
  }
}
