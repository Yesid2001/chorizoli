import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Producto } from './entities/producto.entity';
import { Categoria } from '../categorias/entities/categoria.entity';

import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,

    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  findAll() {
    return this.productoRepository.find({
      relations: {
  categoria: true,
},
    });
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({
      where: { idProducto: id },
      relations: {
  categoria: true,
},
    });

    if (!producto) {
      throw new NotFoundException(
        `Producto ${id} no encontrado`,
      );
    }

    return producto;
  }

  async create(createProductoDto: CreateProductoDto) {
    const categoria =
      await this.categoriaRepository.findOne({
        where: {
          idCategoria: createProductoDto.idCategoria,
        },
      });

    if (!categoria) {
      throw new NotFoundException(
        'Categoria no encontrada',
      );
    }

    const producto =
      this.productoRepository.create({
        nombre: createProductoDto.nombre,
        descripcion: createProductoDto.descripcion,
        precio: createProductoDto.precio,
        stock: createProductoDto.stock,
        categoria,
      });

    return this.productoRepository.save(producto);
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ) {
    const producto = await this.findOne(id);

    Object.assign(producto, updateProductoDto);

    return this.productoRepository.save(producto);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);

    return this.productoRepository.remove(producto);
  }
}