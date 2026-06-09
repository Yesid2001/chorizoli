import {
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  stock: number;

  @IsNumber()
  idCategoria: number;
}