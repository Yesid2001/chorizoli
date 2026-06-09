import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(data: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ where: { isActive: true } });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ 
      where: { id, isActive: true } 
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async update(id: number, data: Partial<Product>): Promise<Product> {
    await this.findOne(id);
    await this.productRepository.update(id, data);
    return this.findOne(id);
  }

  async softDelete(id: number): Promise<void> {
    const product = await this.findOne(id);
    product.isActive = false;
    await this.productRepository.save(product);
  }
}