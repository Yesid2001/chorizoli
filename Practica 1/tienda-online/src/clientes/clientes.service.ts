import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  findAll() {
    return this.clienteRepository.find();
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepository.findOne({
      where: { idCliente: id },
    });

    if (!cliente) {
      throw new NotFoundException(
        `Cliente ${id} no encontrado`,
      );
    }

    return cliente;
  }

  create(createClienteDto: CreateClienteDto) {
    const cliente =
      this.clienteRepository.create(createClienteDto);

    return this.clienteRepository.save(cliente);
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ) {
    const cliente = await this.findOne(id);

    Object.assign(cliente, updateClienteDto);

    return this.clienteRepository.save(cliente);
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);

    return this.clienteRepository.remove(cliente);
  }
}