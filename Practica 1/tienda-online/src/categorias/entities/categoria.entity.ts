
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { Producto } from '../../productos/entities/producto.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  idCategoria: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;
}