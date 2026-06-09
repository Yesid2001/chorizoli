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

import { Categoria } from '../../categorias/entities/categoria.entity';
import { OrdenProducto } from '../../orden-producto/entities/orden-producto.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  idProducto: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column('decimal')
  precio: number;

  @Column()
  stock: number;

  @ManyToOne(
    () => Categoria,
    (categoria) => categoria.productos,
  )
  categoria: Categoria;

  @OneToMany(
    () => OrdenProducto,
    (ordenProducto) => ordenProducto.producto,
  )
  ordenesProducto: OrdenProducto[];

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;
}