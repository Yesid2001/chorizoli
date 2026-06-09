import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  userEmail: string;

  @Column()
  event: string;

  @Column()
  ip: string;

  @Column()
  browser: string;

  @CreateDateColumn()
  timestamp: Date;
}