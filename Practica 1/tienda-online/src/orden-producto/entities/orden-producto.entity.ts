import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

import { Orden } from '../../ordenes/entities/orden.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity()
export class OrdenProducto {
  @PrimaryGeneratedColumn()
  idOrdenProducto: number;

  @ManyToOne(
    () => Orden,
    (orden) => orden.productos,
  )
  orden: Orden;

  @ManyToOne(
    () => Producto,
    (producto) => producto.ordenesProducto,
  )
  producto: Producto;

  @Column()
  cantidad: number;

  @Column('decimal')
  precio_unitario: number;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;
}