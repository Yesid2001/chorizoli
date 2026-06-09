import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { OrdenProductoService } from './orden-producto.service';

import { CreateOrdenProductoDto } from './dto/create-orden-producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden-producto.dto';

@Controller('orden-producto')
export class OrdenProductoController {
  constructor(
    private readonly ordenProductoService: OrdenProductoService,
  ) {}

  @Get()
  findAll() {
    return this.ordenProductoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordenProductoService.findOne(+id);
  }

  @Post()
  create(
    @Body() createDto: CreateOrdenProductoDto,
  ) {
    return this.ordenProductoService.create(
      createDto,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateOrdenProductoDto,
  ) {
    return this.ordenProductoService.update(
      +id,
      updateDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordenProductoService.remove(+id);
  }
}