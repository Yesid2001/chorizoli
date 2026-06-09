import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { LogsService } from '../logs/logs.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private logsService: LogsService,
  ) {}

  async validatePassword(password: string): Promise<{ strength: string; score: number }> {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    let strength = 'débil';
    if (score >= 3) strength = 'fuerte';
    else if (score >= 2) strength = 'intermedio';
    
    return { strength, score };
  }

  async register(email: string, password: string, name: string, captchaAnswer: string) {
    // CAPTCHA validado en el frontend (pregunta matemática aleatoria)
    // Solo verificamos que el campo no esté vacío
    if (!captchaAnswer || captchaAnswer.trim() === '') {
      throw new BadRequestException('CAPTCHA requerido');
    }
    
    const passwordStrength = await this.validatePassword(password);
    if (passwordStrength.strength === 'débil') {
      throw new BadRequestException('Contraseña demasiado débil. Usa al menos 8 caracteres, mayúsculas, números y símbolos.');
    }
    
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('El email ya está registrado');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
    });
    await this.userRepository.save(user);
    
    return { message: 'Usuario registrado exitosamente', passwordStrength };
  }

  async login(email: string, password: string, ip: string, browser: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    
    await this.logsService.createLog(user.id, user.email, 'ingreso', ip, browser);
    
    return { 
      access_token: token, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role } 
    };
  }

  async logout(userId: number, userEmail: string, ip: string, browser: string) {
    await this.logsService.createLog(userId, userEmail, 'salida', ip, browser);
    return { message: 'Sesión cerrada correctamente' };
  }
}