import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Orden } from './entities/orden.entity';
import { Cliente } from '../clientes/entities/cliente.entity';

import { OrdenesController } from './ordenes.controller';
import { OrdenesService } from './ordenes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Orden,
      Cliente,
    ]),
  ],
  controllers: [OrdenesController],
  providers: [OrdenesService],
})
export class OrdenesModule {}