import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { email: string; password: string; name: string; captcha: string },
    @Req() req: Request,
  ) {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const browser = req.headers['user-agent'] || 'unknown';
    
    return this.authService.register(body.email, body.password, body.name, body.captcha);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Req() req: Request,
  ) {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const browser = req.headers['user-agent'] || 'unknown';
    
    return this.authService.login(body.email, body.password, ip, browser);
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    const userId = req.body.userId;
    const userEmail = req.body.userEmail;
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const browser = req.headers['user-agent'] || 'unknown';
    
    return this.authService.logout(userId, userEmail, ip, browser);
  }
}