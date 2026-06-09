import { IsNumber } from 'class-validator';

export class CreateOrdenProductoDto {
  @IsNumber()
  idOrden: number;

  @IsNumber()
  idProducto: number;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  precio_unitario: number;
}