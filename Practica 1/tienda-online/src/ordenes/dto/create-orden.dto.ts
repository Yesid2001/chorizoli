import { IsNumber, IsString } from 'class-validator';

export class CreateOrdenDto {
  @IsString()
  estado: string;

  @IsNumber()
  total: number;

  @IsNumber()
  idCliente: number;
}