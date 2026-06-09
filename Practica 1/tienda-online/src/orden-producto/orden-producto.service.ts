import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrdenProducto } from './entities/orden-producto.entity';
import { Orden } from '../ordenes/entities/orden.entity';
import { Producto } from '../productos/entities/producto.entity';

import { CreateOrdenProductoDto } from './dto/create-orden-producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden-producto.dto';

@Injectable()
export class OrdenProductoService {
  constructor(
    @InjectRepository(OrdenProducto)
    private ordenProductoRepository: Repository<OrdenProducto>,

    @InjectRepository(Orden)
    private ordenRepository: Repository<Orden>,

    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  findAll() {
    return this.ordenProductoRepository.find({
      relations: {
        orden: true,
        producto: true,
      },
    });
  }

  async findOne(id: number) {
    const registro =
      await this.ordenProductoRepository.findOne({
        where: { idOrdenProducto: id },
        relations: {
          orden: true,
          producto: true,
        },
      });

    if (!registro) {
      throw new NotFoundException(
        `Registro ${id} no encontrado`,
      );
    }

    return registro;
  }

  async create(
    createDto: CreateOrdenProductoDto,
  ) {
    const orden = await this.ordenRepository.findOne({
      where: { idOrden: createDto.idOrden },
    });

    if (!orden) {
      throw new NotFoundException(
        'Orden no encontrada',
      );
    }

    const producto =
      await this.productoRepository.findOne({
        where: {
          idProducto: createDto.idProducto,
        },
      });

    if (!producto) {
      throw new NotFoundException(
        'Producto no encontrado',
      );
    }

    const registro =
      this.ordenProductoRepository.create({
        cantidad: createDto.cantidad,
        precio_unitario:
          createDto.precio_unitario,
        orden,
        producto,
      });

    return this.ordenProductoRepository.save(
      registro,
    );
  }

  async update(
    id: number,
    updateDto: UpdateOrdenProductoDto,
  ) {
    const registro = await this.findOne(id);

    Object.assign(registro, updateDto);

    return this.ordenProductoRepository.save(
      registro,
    );
  }

  async remove(id: number) {
    const registro = await this.findOne(id);

    return this.ordenProductoRepository.remove(
      registro,
    );
  }
}