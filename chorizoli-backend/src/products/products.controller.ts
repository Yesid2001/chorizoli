import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Post()
  async create(@Body() data: Partial<Product>): Promise<Product> {
    return this.productsService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Product>): Promise<Product> {
    return this.productsService.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.productsService.softDelete(+id);
  }
}