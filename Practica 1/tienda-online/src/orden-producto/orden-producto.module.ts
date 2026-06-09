import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdenProducto } from './entities/orden-producto.entity';
import { Orden } from '../ordenes/entities/orden.entity';
import { Producto } from '../productos/entities/producto.entity';

import { OrdenProductoController } from './orden-producto.controller';
import { OrdenProductoService } from './orden-producto.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdenProducto,
      Orden,
      Producto,
    ]),
  ],
  controllers: [OrdenProductoController],
  providers: [OrdenProductoService],
})
export class OrdenProductoModule {}