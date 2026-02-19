import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly publicSelect = {
    id: true,
    email: true,
    name: true,
    createdAt: true,
  };
  constructor(private readonly prisma: PrismaService) {}
  create(user: { name: string; email: string; password: string }) {
    return this.prisma.user.create({
      data: user,
      select: this.publicSelect,
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: this.publicSelect,
    });
  }

  findPublicById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });
  }

  findMe(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: this.publicSelect,
    });
  }

  findForAuthByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  updateProfile(id: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name }),
      },
    });
  }

  deleteByAdmin(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
