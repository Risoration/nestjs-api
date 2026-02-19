import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req) {
    return req.user;
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.login(dto);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return { success: true };
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  validateUser(@Body() email: string, password: string) {
    return this.authService.validateUser(email, password);
  }
}
