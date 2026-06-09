import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Cliente } from '../../clientes/entities/cliente.entity';
import { OrdenProducto } from '../../orden-producto/entities/orden-producto.entity';

@Entity()
export class Orden {
  @PrimaryGeneratedColumn()
  idOrden: number;

  @Column()
  estado: string;

  @Column('decimal')
  total: number;

  @ManyToOne(
    () => Cliente,
    (cliente) => cliente.ordenes,
  )
  cliente: Cliente;

  @OneToMany(
    () => OrdenProducto,
    (ordenProducto) => ordenProducto.orden,
  )
  productos: OrdenProducto[];

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;
}