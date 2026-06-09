import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { OneToMany } from 'typeorm';
import { Orden } from '../../ordenes/entities/orden.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  idCliente: number;

  @Column()
  nombres: string;

  @Column()
  paterno: string;

  @Column()
  materno: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;

  @OneToMany(() => Orden, (orden) => orden.cliente)
ordenes: Orden[];
}