import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async createLog(userId: number, userEmail: string, event: string, ip: string, browser: string): Promise<Log> {
    const log = this.logRepository.create({ userId, userEmail, event, ip, browser });
    return this.logRepository.save(log);
  }

  async findAll(): Promise<Log[]> {
    return this.logRepository.find({ order: { timestamp: 'DESC' } });
  }

  async getUserLogs(userId: number): Promise<Log[]> {
    return this.logRepository.find({ where: { userId }, order: { timestamp: 'DESC' } });
  }
}