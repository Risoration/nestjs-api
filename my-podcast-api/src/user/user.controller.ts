import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { Request } from 'express';
import { CurrentUser } from 'src/auth/decorators/current-user-decorator';

interface JwtUser {
  id: string;
  email: string;
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: JwtUser) {
    return this.userService.findMe(user.id);
  }

  @Get(':id')
  getPublicProfile(@Param('id') id: string) {
    return this.userService.findPublicById(id);
  }

  @Patch('me')
  updateMe(@Body() dto: UpdateUserDto) {
    throw new Error('Auth not wired yet');
  }
}
