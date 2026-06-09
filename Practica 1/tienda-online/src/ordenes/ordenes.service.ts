import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Orden } from './entities/orden.entity';
import { Cliente } from '../clientes/entities/cliente.entity';

import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Orden)
    private ordenRepository: Repository<Orden>,

    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  findAll() {
    return this.ordenRepository.find({
      relations: {
        cliente: true,
      },
    });
  }

  async findOne(id: number) {
    const orden = await this.ordenRepository.findOne({
      where: { idOrden: id },
      relations: {
        cliente: true,
      },
    });

    if (!orden) {
      throw new NotFoundException(
        `Orden ${id} no encontrada`,
      );
    }

    return orden;
  }

  async create(createOrdenDto: CreateOrdenDto) {
    const cliente =
      await this.clienteRepository.findOne({
        where: {
          idCliente: createOrdenDto.idCliente,
        },
      });

    if (!cliente) {
      throw new NotFoundException(
        'Cliente no encontrado',
      );
    }

    const orden = this.ordenRepository.create({
      estado: createOrdenDto.estado,
      total: createOrdenDto.total,
      cliente,
    });

    return this.ordenRepository.save(orden);
  }

  async update(
    id: number,
    updateOrdenDto: UpdateOrdenDto,
  ) {
    const orden = await this.findOne(id);

    Object.assign(orden, updateOrdenDto);

    return this.ordenRepository.save(orden);
  }

  async remove(id: number) {
    const orden = await this.findOne(id);

    return this.ordenRepository.remove(orden);
  }
}