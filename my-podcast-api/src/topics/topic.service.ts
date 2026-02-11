import { Injectable } from '@nestjs/common';
import { CreateTopicDto, UpdateTopicDto } from './dto/topic.dto';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TopicsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(sort: 'asc' | 'desc' = 'asc') {
    return this.prisma.topic.findMany({
      orderBy: {
        name: sort == 'asc' ? 'asc' : 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.topic.findUnique({
      where: { id },
    });
  }

  async create(createTopicDto: CreateTopicDto) {
    return this.prisma.topic.create({
      data: {
        name: createTopicDto.name,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.topic.delete({
      where: { id },
    });
  }

  async update(id: string, updateTopicDto: UpdateTopicDto) {
    return this.prisma.topic.update({
      where: { id },
      data: {
        name: updateTopicDto.name,
      },
    });
  }
}
