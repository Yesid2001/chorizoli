import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { LogsModule } from '../logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET', 'chorizoli_secret_key_2024'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
    LogsModule,  // ← Asegúrate que esto esté
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}